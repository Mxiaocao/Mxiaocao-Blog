import { examples, parsePoints, convexTrace, measure } from './convex-hull-engine.mjs';

const $ = id => document.getElementById(id);
const code = ['按 (x, y) 排序，去除重复点', '不同点数 ≤ 2：直接返回', '从左到右扫描下凸壳', '计算 cross(B−A, C−A)', 'cross ≤ 0：弹出 B，继续检查', '将当前点 C 压入栈', '记录 lower_size，逆序扫描上凸壳', '删除重复起点，返回凸包'];
let input = [], points = [], frames = [], index = 0, timer = null;
const xy = p => `${240 + p.x * 20},${240 - p.y * 20}`;
const path = list => list.map(xy).join(' ');

function pause() { clearInterval(timer); timer = null; $('play').textContent = index === frames.length - 1 ? '重播' : '播放'; }
function setPoints(text) {
  pause();
  try {
    const next = parsePoints(text), result = convexTrace(next);
    input = next; points = result.points; frames = result.frames; index = 0;
    $('points').value = text; $('error').textContent = ''; $('progress').max = frames.length - 1;
    render();
    return true;
  } catch (error) { $('error').textContent = error.message; return false; }
}
function render() {
  const f = frames[index];
  $('phase').textContent = f.phase + (f.boundary && !f.complete ? ` · lower_size = ${f.boundary}` : '');
  const chips = list => list.map(p => `<span class="point-chip ${f.current?.id === p.id ? 'current' : ''}">P${p.id} (${p.x}, ${p.y})</span>`).join('') || '<span class="muted">空</span>';
  $('sorted').innerHTML = chips(points); $('stack').innerHTML = chips(f.hull);
  if (f.triple.length) {
    const [a, b, c] = f.triple;
    $('turn').textContent = `A=P${a.id}，B=P${b.id}，C=P${c.id}；cross = (${b.x - a.x}) × (${c.y - a.y}) − (${b.y - a.y}) × (${c.x - a.x}) = ${f.turn}`;
  } else $('turn').textContent = '叉积 > 0 为左转；≤ 0 时弹出中间点。坐标轴 y 向上。';
  if (f.complete) {
    const result = measure(f.hull);
    $('metrics').textContent = `凸包顶点 ${f.hull.length} 个 · 面积 ${result.area} · ${f.hull.length === 2 ? '线段往返长度' : '周长'} ${result.perimeter.toFixed(2)}`;
  } else $('metrics').textContent = '面积和周长在凸包完成后显示。';
  $('code').innerHTML = code.map((text, i) => `<li class="${i === f.line ? 'current' : ''}" ${i === f.line ? 'aria-current="step"' : ''}>${text}</li>`).join('');
  $('status').textContent = f.message; $('counter').textContent = `${index} / ${frames.length - 1}`;
  $('progress').value = index; $('prev').disabled = index === 0; $('next').disabled = index === frames.length - 1;
  $('play').textContent = timer ? '暂停' : index === frames.length - 1 ? '重播' : '播放';
  draw(f);
}
function draw(f) {
  let svg = '';
  for (let k = -10; k <= 10; k++) {
    const at = 240 + 20 * k;
    svg += `<path class="${k === 0 ? 'axis' : 'grid-line'}" d="M ${at} 40 V 440 M 40 ${at} H 440"/>`;
    if (k % 5 === 0) svg += `<text class="tick" x="${at}" y="458">${k}</text><text class="tick" x="22" y="${480 - at}">${k}</text>`;
  }
  svg += '<text class="tick" x="462" y="238">x</text><text class="tick" x="240" y="24">y</text>';
  if (f.complete && f.hull.length >= 3) svg += `<polygon class="finished-hull" points="${path(f.hull)}"/>`;
  else {
    if (f.lower.length && !f.complete) svg += `<polyline class="lower-line" points="${path(f.lower)}"/>`;
    if (f.hull.length > 1) svg += `<polyline class="${f.complete ? 'finished-hull' : 'hull-line'}" points="${path(f.hull)}"/>`;
  }
  if (f.triple.length) svg += `<polyline class="turn-line" points="${path(f.triple)}"/>`;
  for (const p of points) {
    const x = 240 + p.x * 20, y = 240 - p.y * 20;
    svg += `<g data-id="${p.id}"><circle class="plot-point ${f.hull.some(h => h.id === p.id) ? 'on-hull' : ''} ${f.current?.id === p.id ? 'current' : ''}" cx="${x}" cy="${y}" r="5"><title>P${p.id} (${p.x}, ${p.y})</title></circle><text class="point-label" x="${x + 12}" y="${y - 12}">P${p.id}</text></g>`;
  }
  if (f.removed) {
    const x = 240 + f.removed.x * 20, y = 240 - f.removed.y * 20;
    svg += `<path class="removed-mark" pointer-events="none" d="M ${x - 7} ${y - 7} l 14 14 M ${x - 7} ${y + 7} l 14 -14"/>`;
  }
  $('plot').innerHTML = svg;
}
function move(value) { pause(); index = Math.max(0, Math.min(frames.length - 1, value)); render(); }
function play() {
  if (timer) { pause(); return; }
  if (index === frames.length - 1) index = 0;
  timer = setInterval(() => { index++; if (index >= frames.length - 1) { index = frames.length - 1; pause(); } render(); }, Number($('speed').value));
  render();
}
$('preset').innerHTML = Object.entries(examples).map(([key, value]) => `<option value="${key}">${value.label}</option>`).join('');
$('preset').onchange = () => setPoints(examples[$('preset').value].text);
$('apply').onclick = () => setPoints($('points').value);
$('clear').onclick = () => setPoints('');
$('random').onclick = () => {
  const coordinates = new Set();
  while (coordinates.size < 12) coordinates.add(`${Math.floor(Math.random() * 19) - 9} ${Math.floor(Math.random() * 19) - 9}`);
  setPoints([...coordinates].join('\n'));
};
$('edit-mode').onchange = () => { pause(); $('plot').classList.toggle('editable', $('edit-mode').checked); };
$('plot').onclick = event => {
  if (!$('edit-mode').checked) return;
  const svg = $('plot'), ctm = svg.getScreenCTM();
  if (!ctm) return;
  const local = new DOMPoint(event.clientX, event.clientY).matrixTransform(ctm.inverse());
  if (local.x < 40 || local.x > 440 || local.y < 40 || local.y > 440) return;
  const point = { x: Math.round((local.x - 240) / 20), y: Math.round((240 - local.y) / 20) };
  const target = event.target.closest('[data-id]');
  const existing = target ? input.find(p => p.id === Number(target.dataset.id)) : input.find(p => p.x === point.x && p.y === point.y);
  const next = existing ? input.filter(p => p.x !== existing.x || p.y !== existing.y) : [...input, point];
  setPoints(next.map(p => `${p.x} ${p.y}`).join('\n'));
};
$('reset').onclick = () => move(0); $('prev').onclick = () => move(index - 1); $('next').onclick = () => move(index + 1);
$('progress').oninput = () => move(Number($('progress').value)); $('play').onclick = play;
$('speed').onchange = () => { if (timer) { pause(); play(); } };
document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });

let themeObserver;
const media = matchMedia('(prefers-color-scheme: dark)');
function syncTheme() {
  let dark = media.matches;
  try {
    if (parent !== window) {
      dark = parent.document.documentElement.classList.contains('dark');
      document.body.style.fontFamily = parent.getComputedStyle(parent.document.body).fontFamily;
    }
  } catch { /* Cross-origin embeds use the OS theme. */ }
  document.documentElement.classList.toggle('dark', dark);
}
const resizeObserver = new ResizeObserver(() => {
  if (window.frameElement) window.frameElement.style.height = `${Math.ceil(document.body.getBoundingClientRect().height) + 2}px`;
});
function observe() {
  syncTheme(); resizeObserver.observe(document.body);
  try {
    if (parent !== window) {
      themeObserver ??= new MutationObserver(syncTheme);
      themeObserver.observe(parent.document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }
  } catch { /* No access to cross-origin parent. */ }
}
media.addEventListener('change', syncTheme);
window.addEventListener('pagehide', () => { pause(); resizeObserver.disconnect(); themeObserver?.disconnect(); });
window.addEventListener('pageshow', observe);
observe(); setPoints(examples.general.text);
