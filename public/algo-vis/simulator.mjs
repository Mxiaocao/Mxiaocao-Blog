import { names, presets, isMST, parseGraph, trace, fmt } from './algorithms.mjs';

const pageMode = document.body.dataset.algorithm;
let mode = pageMode, graph, frames = [], index = 0, timer = null;
const $ = (id) => document.getElementById(id);
const code = {
  dijkstra: ['dist[s] = 0，其余为 ∞', 'u = 未确定顶点中 dist 最小者；确定 u', '遍历 u 的出边 (u, v, w)', '若 dist[u] + w < dist[v]，更新 dist / pre', '没有可达的未确定顶点时结束', '返回 dist 与前驱路径'],
  spfa: ['dist[s] = 0；s 入队', 'u 出队，清除在队标记', '遍历 u 的出边 (u, v, w)', '松弛成功：更新路径边数，v 不在队才入队', '改善路径边数 ≥ n：存在可达负环', '队列为空则完成；发现负环则停止'],
  bellman: ['dist[s] = 0，其余为 ∞', '逐轮扫描所有边', '检查 dist[u] + w 与 dist[v]', '更小时更新 dist[v] 与 pre[v]', '无更新提前结束；第 n 轮仍更新则有负环', '返回距离，或报告可达负环'],
  floyd: ['初始化 d[i][j]，d[i][i] = 0', 'for k：允许经过中转点 k', 'for i, j：比较 d[i][j] 与 d[i][k] + d[k][j]', '更小时更新 d[i][j]', '检查负环；否则返回全源距离矩阵'],
  kruskal: ['初始化并查集与空边集', '按权重从小到大排序所有边', '依次取出最小边 (u, v)', 'find(u) == find(v)：会成环，跳过', '否则合并集合，选入边并累计权重', '选满 n−1 条边，或报告图不连通'],
  prim: ['初始化空树', '起点加入树', '找出所有跨越树内 / 树外的边', '选择权重最小者，将树外顶点加入', '重复比较跨界边', '覆盖所有顶点，或报告图不连通'],
};

$('app').innerHTML = `
  <h1 id="heading"></h1><p class="muted" id="intro"></p>
  <div class="toolbar">
    ${pageMode === 'spfa' ? '<label>算法 <select id="algorithm"><option value="spfa">SPFA</option><option value="bellman">Bellman-Ford</option></select></label>' : ''}
    <label>示例 <select id="preset"></select></label>
    <label id="source-label">起点 <select id="source"></select></label>
  </div>
  <div class="layout">
    <div class="graph"><svg id="graph" viewBox="0 0 520 310" role="img" aria-label="带权图与当前算法状态"></svg>
      <div class="legend"><span class="active">当前检查</span><span class="done">已确定 / 树内</span><span class="chosen">选入的树边</span></div>
    </div>
    <div><div class="scroll" id="state"></div><p class="queue muted" id="queue"></p><ol id="code" aria-label="算法步骤"></ol></div>
  </div>
  <div class="status" id="status" role="status" aria-live="polite" aria-atomic="true"></div>
  <div class="progress"><input id="progress" type="range" min="0" value="0" aria-label="执行进度"><output id="counter"></output></div>
  <div class="toolbar">
    <button id="reset" type="button">重置</button><button id="prev" type="button">上一步</button>
    <button id="play" class="primary" type="button">播放</button><button id="next" type="button">下一步</button>
    <label>速度 <select id="speed"><option value="1600">慢速</option><option value="850" selected>正常</option><option value="250">快速</option></select></label>
  </div>
  <details id="editor"><summary>编辑图数据</summary>
    <p class="muted" id="format"></p><label>顶点数 <input id="count" type="number" min="2" max="8" value="6"></label>
    <p><label for="edges">边列表（每行：起点 终点 权重）</label></p><textarea id="edges" spellcheck="false"></textarea>
    <div class="toolbar"><button id="apply" type="button">应用并重新开始</button></div><p id="error" class="error" role="alert"></p>
  </details>`;

function pause() { clearInterval(timer); timer = null; $('play').textContent = index === frames.length - 1 ? '重播' : '播放'; }
function render() {
  const f = frames[index];
  $('status').textContent = f.message;
  $('counter').textContent = `${index} / ${frames.length - 1}`;
  $('progress').value = index;
  $('prev').disabled = index === 0;
  $('next').disabled = index === frames.length - 1;
  $('play').textContent = timer ? '暂停' : index === frames.length - 1 ? '重播' : '播放';
  $('code').innerHTML = code[mode].map((line, i) => `<li class="${i === f.line ? 'current' : ''}" ${i === f.line ? 'aria-current="step"' : ''}>${escapeHTML(line)}</li>`).join('');
  if (mode === 'floyd') {
    $('state').innerHTML = `<table><caption>距离矩阵 d[i][j]${f.via === null ? '' : ` · 中转点 k = ${f.via}`}</caption><thead><tr><th scope="col">起 / 终</th>${Array.from({ length: graph.n }, (_, i) => `<th scope="col">${i}</th>`).join('')}</tr></thead><tbody>${f.matrix.map((row, i) => `<tr><th scope="row">${i}</th>${row.map((v, j) => `<td class="${f.cell?.[0] === i && f.cell?.[1] === j ? 'highlight' : ''}">${fmt(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  } else if (isMST(mode)) {
    $('state').innerHTML = `<table><caption>生成树状态</caption><tbody><tr><th scope="row">已选边</th><td>${f.chosen.length} / ${graph.n - 1}</td></tr><tr><th scope="row">总权重</th><td>${f.total}</td></tr></tbody></table><p class="muted">已选：${f.chosen.map(id => { const e = graph.edges[id]; return `${e.u}–${e.v} (${e.w})`; }).join('，') || '暂无'}</p>`;
  } else {
    $('state').innerHTML = `<table><caption>源点 ${$('source').value} 的距离与前驱</caption><thead><tr><th scope="col">顶点</th><th scope="col">dist</th><th scope="col">pre</th><th scope="col">状态</th></tr></thead><tbody>${f.dist.map((d, i) => `<tr><th scope="row">${i}</th><td class="${f.nodes.includes(i) ? 'highlight' : ''}">${fmt(d)}</td><td>${f.pre[i] < 0 ? '·' : f.pre[i]}</td><td>${f.done.includes(i) ? '已确定' : f.queue.includes(i) ? '在队' : d === Infinity ? '未到达' : '已到达'}</td></tr>`).join('')}</tbody></table>`;
  }
  $('queue').textContent = mode === 'spfa' ? `队列（左侧出队）：${f.queue.join(' → ') || '空'}` : isMST(mode) ? `候选边：${f.queue.join('，') || '无'}` : mode === 'floyd' ? '行表示起点，列表示终点；∞ 表示不可达。' : '∞ 表示不可达；pre 表示前驱顶点。';
  drawGraph(f);
}
function escapeHTML(text) { return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'); }
function drawGraph(f) {
  const positions = Array.from({ length: graph.n }, (_, i) => {
    const angle = -Math.PI + 2 * Math.PI * i / graph.n;
    return [260 + 202 * Math.cos(angle), 155 + 112 * Math.sin(angle)];
  });
  let svg = '<defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke"/></marker></defs>';
  for (const e of graph.edges) {
    const [x1, y1] = positions[e.u], [x2, y2] = positions[e.v];
    const dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy);
    const reciprocal = !isMST(mode) && graph.edges.some(other => other.u === e.v && other.v === e.u);
    const bend = reciprocal ? 32 : 0;
    const cx = (x1 + x2) / 2 - dy / len * bend, cy = (y1 + y2) / 2 + dx / len * bend;
    const startLen = Math.hypot(cx - x1, cy - y1), endLen = Math.hypot(cx - x2, cy - y2);
    const sx = x1 + (cx - x1) / startLen * 23, sy = y1 + (cy - y1) / startLen * 23;
    const ex = x2 + (cx - x2) / endLen * 25, ey = y2 + (cy - y2) / endLen * 25;
    const tx = (sx + 2 * cx + ex) / 4 - dy / len * 10, ty = (sy + 2 * cy + ey) / 4 + dx / len * 10;
    svg += `<path class="edge ${f.chosen.includes(e.id) ? 'chosen' : ''} ${f.active.includes(e.id) ? 'active' : ''}" d="M ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}" ${isMST(mode) ? '' : 'marker-end="url(#arrow)"'}/><text class="weight" x="${tx}" y="${ty}">${e.w}</text>`;
  }
  positions.forEach(([x, y], i) => {
    svg += `<circle class="node ${f.done.includes(i) ? 'done' : ''} ${f.nodes.includes(i) ? 'active' : ''}" cx="${x}" cy="${y}" r="21"/><text class="node-label" x="${x}" y="${y}">${i}</text>`;
  });
  $('graph').innerHTML = svg;
}
function applyGraph() {
  pause();
  try {
    const nextGraph = parseGraph($('edges').value, Number($('count').value), mode);
    let source = Number($('source').value || 0);
    if (source >= nextGraph.n) source = 0;
    const nextFrames = trace(mode, nextGraph, source);
    graph = nextGraph; frames = nextFrames; index = 0;
    $('source').innerHTML = Array.from({ length: graph.n }, (_, i) => `<option value="${i}">${i}</option>`).join('');
    $('source').value = source;
    $('progress').max = frames.length - 1;
    $('error').textContent = '';
    render();
  } catch (error) { $('error').textContent = error.message; $('editor').open = true; }
}
function choosePreset() {
  const preset = presets[$('preset').value];
  $('count').value = preset.n; $('edges').value = preset.text; applyGraph();
}
function setup() {
  $('heading').textContent = `${names[mode]} 算法模拟`;
  $('intro').textContent = isMST(mode) ? '无向带权图 · 观察每条边如何被选入或舍弃。' : mode === 'floyd' ? '有向带权图 · 观察中转点如何改变全源最短距离。' : '有向带权图 · 观察松弛、距离与前驱的变化。';
  $('format').textContent = `支持 2～8 个顶点、最多 32 条边；编号从 0 开始，整数权重 -99～99。${isMST(mode) ? '无向边只输入一次。' : '每行是一条有向边。'}不支持自环或重复边。Dijkstra 仅支持非负权。`;
  $('source-label').hidden = mode === 'floyd' || mode === 'kruskal';
  const options = mode === 'dijkstra' || isMST(mode) ? ['positive', 'disconnected'] : ['positive', 'negative', 'cycle', 'disconnected'];
  $('preset').innerHTML = options.map(key => `<option value="${key}">${presets[key].label}</option>`).join('');
  choosePreset();
}
function move(value) { pause(); index = Math.max(0, Math.min(frames.length - 1, value)); render(); }
function play() {
  if (timer) { pause(); return; }
  if (index === frames.length - 1) index = 0;
  timer = setInterval(() => { index++; if (index >= frames.length - 1) { index = frames.length - 1; pause(); } render(); }, Number($('speed').value));
  render();
}
$('reset').onclick = () => move(0);
$('prev').onclick = () => move(index - 1);
$('next').onclick = () => move(index + 1);
$('progress').oninput = () => move(Number($('progress').value));
$('play').onclick = play;
$('speed').onchange = () => { if (timer) { pause(); play(); } };
$('preset').onchange = choosePreset;
$('source').onchange = () => { pause(); frames = trace(mode, graph, Number($('source').value)); index = 0; $('progress').max = frames.length - 1; render(); };
$('apply').onclick = applyGraph;
if ($('algorithm')) $('algorithm').onchange = () => { mode = $('algorithm').value; applyGraph(); $('heading').textContent = `${names[mode]} 算法模拟`; };
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
window.addEventListener('pagehide', pause);

// Same-origin iframe: inherit the site's theme and size to its own content.
let themeObserver;
function syncTheme() {
  try {
    const embedded = parent !== window;
    const dark = embedded ? parent.document.documentElement.classList.contains('dark') : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
    if (embedded) document.body.style.fontFamily = parent.getComputedStyle(parent.document.body).fontFamily;
  } catch { document.documentElement.classList.toggle('dark', matchMedia('(prefers-color-scheme: dark)').matches); }
}
syncTheme();
try { if (parent !== window) { themeObserver = new MutationObserver(syncTheme); themeObserver.observe(parent.document.documentElement, { attributes: true, attributeFilter: ['class'] }); } } catch { /* Standalone cross-origin embed uses OS theme. */ }
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncTheme);
const resizeObserver = new ResizeObserver(() => { if (window.frameElement) window.frameElement.style.height = `${Math.ceil(document.body.getBoundingClientRect().height) + 2}px`; });
resizeObserver.observe(document.body);
window.addEventListener('pagehide', () => { resizeObserver.disconnect(); themeObserver?.disconnect(); });
setup();
