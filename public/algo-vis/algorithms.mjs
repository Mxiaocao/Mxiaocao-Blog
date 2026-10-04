// Pure, deterministic traces: every frame owns its state, so stepping back is exact.
export const names = { dijkstra: 'Dijkstra', spfa: 'SPFA', bellman: 'Bellman-Ford', floyd: 'Floyd', kruskal: 'Kruskal', prim: 'Prim' };
export const isMST = (mode) => mode === 'kruskal' || mode === 'prim';
export const presets = {
  positive: { label: '非负权图', n: 6, text: '0 1 5\n0 2 2\n2 1 1\n1 3 3\n2 3 7\n2 4 4\n3 5 2\n4 5 1' },
  negative: { label: '负边，无负环', n: 6, text: '0 1 5\n0 2 2\n2 1 -1\n1 3 3\n2 4 4\n3 5 2\n4 5 -2' },
  cycle: { label: '可达负环', n: 6, text: '0 1 2\n1 2 -4\n2 3 1\n3 1 1\n3 4 2\n4 5 1' },
  disconnected: { label: '不连通图', n: 6, text: '0 1 3\n1 2 2\n0 2 8\n3 4 1\n4 5 2' },
};
export function parseGraph(text, n, mode) {
  if (!Number.isInteger(n) || n < 2 || n > 8) throw new Error('顶点数应为 2 到 8 的整数。');
  const lines = text.trim() ? text.trim().split(/\r?\n/) : [];
  if (lines.length > 32) throw new Error('最多输入 32 条边。');
  const seen = new Set();
  const edges = lines.map((line, id) => {
    const parts = line.trim().split(/\s+/).map(Number);
    const [u, v, w] = parts;
    if (parts.length !== 3 || !parts.every(Number.isInteger) || u < 0 || v < 0 || u >= n || v >= n || Math.abs(w) > 99) throw new Error(`第 ${id + 1} 行：请输入“起点 终点 权重”，顶点为 0～${n - 1}，整数权重为 -99～99。`);
    if (u === v) throw new Error(`第 ${id + 1} 行：演示暂不支持自环。`);
    if (mode === 'dijkstra' && w < 0) throw new Error('Dijkstra 要求所有边权非负，请改用 SPFA 或 Bellman-Ford。');
    const key = isMST(mode) ? [Math.min(u, v), Math.max(u, v)].join(',') : `${u},${v}`;
    if (seen.has(key)) throw new Error(`第 ${id + 1} 行：请合并重复边，保留最小权重。`);
    seen.add(key);
    return { u, v, w, id };
  });
  return { n, edges };
}

export function trace(mode, graph, source = 0) {
  if (!names[mode]) throw new Error('未知算法');
  const { n, edges } = graph;
  if (!Number.isInteger(source) || source < 0 || source >= n) throw new Error('起点超出范围。');
  if (mode === 'dijkstra' && edges.some(e => e.w < 0)) throw new Error('Dijkstra 不支持负权边。');
  const state = { dist: Array(n).fill(Infinity), pre: Array(n).fill(-1), done: [], chosen: [], queue: [], total: 0, matrix: null, cell: null, via: null, negative: false };
  const frames = [];
  const emit = (message, line = 0, nodes = [], active = []) => frames.push({ ...structuredClone(state), message, line, nodes, active });
  const relax = (e) => {
    const old = state.dist[e.v];
    const candidate = state.dist[e.u] + e.w;
    const changed = Number.isFinite(state.dist[e.u]) && candidate < old;
    if (changed) { state.dist[e.v] = candidate; state.pre[e.v] = e.u; }
    return { changed, message: `检查 ${e.u} → ${e.v}：${fmt(state.dist[e.u])} + (${e.w}) ${changed ? '<' : '≥'} ${fmt(old)}，${changed ? `更新 dist[${e.v}] = ${candidate}` : '不更新'}。` };
  };
  if (mode === 'floyd') {
    state.matrix = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 0 : Infinity));
    for (const e of edges) state.matrix[e.u][e.v] = Math.min(state.matrix[e.u][e.v], e.w);
    emit('初始化距离矩阵：对角线为 0，无边为 ∞。');
    for (let k = 0; k < n; k++) {
      state.via = k; state.cell = null;
      emit(`允许经过中转点 ${k}，依次检查所有起终点。`, 1, [k]);
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const old = state.matrix[i][j];
        const a = state.matrix[i][k], b = state.matrix[k][j];
        const changed = a + b < old;
        state.cell = [i, j];
        if (changed) state.matrix[i][j] = a + b;
        emit(`经 ${k} 检查 ${i} → ${j}：min(${fmt(old)}, ${fmt(a)} + ${fmt(b)}) = ${fmt(state.matrix[i][j])}${changed ? '，更新距离' : '，保持不变'}。`, changed ? 3 : 2, [i, k, j]);
      }
      if (state.matrix.some((row, i) => row[i] < 0)) {
        state.negative = true;
        emit('发现 d[v][v] < 0：图中存在负环。受负环影响的点对没有有限最短路，停止演示。', 4);
        return frames;
      }
    }
    state.cell = null; state.via = null;
    emit('完成：矩阵给出所有点对的最短距离；∞ 表示不可达。', 4);
  } else if (isMST(mode)) {
    const parent = Array.from({ length: n }, (_, i) => i);
    const root = (u) => { while (parent[u] !== u) u = parent[u]; return u; };
    emit('初始化：尚未选边，总权重为 0。无向图的每条边只需输入一次。');
    if (mode === 'kruskal') {
      const sorted = [...edges].sort((a, b) => a.w - b.w || a.id - b.id);
      state.queue = sorted.map(e => `${e.u}–${e.v}(${e.w})`);
      emit('按边权从小到大排序。', 1);
      for (const e of sorted) {
        state.queue.shift();
        emit(`检查边 ${e.u}–${e.v}，权重 ${e.w}。`, 2, [e.u, e.v], [e.id]);
        if (root(e.u) === root(e.v)) { emit('两个端点已经连通，加入会成环，跳过。', 3, [e.u, e.v], [e.id]); continue; }
        parent[root(e.u)] = root(e.v);
        state.chosen.push(e.id); state.total += e.w;
        state.done = [...new Set([...state.done, e.u, e.v])];
        emit(`合并两个连通分量，选入此边。总权重 ${state.total}。`, 4, [e.u, e.v], [e.id]);
        if (state.chosen.length === n - 1) break;
      }
    } else {
      state.done.push(source);
      emit(`从顶点 ${source} 开始生长生成树。`, 1, [source]);
      while (state.done.length < n) {
        const candidates = edges.filter(e => state.done.includes(e.u) !== state.done.includes(e.v)).sort((a, b) => a.w - b.w || a.id - b.id);
        state.queue = candidates.map(e => `${e.u}–${e.v}(${e.w})`);
        emit('比较所有跨越“树内 / 树外”的边。', 2, [], candidates.map(e => e.id));
        const e = candidates[0];
        if (!e) break;
        const v = state.done.includes(e.u) ? e.v : e.u;
        state.done.push(v); state.chosen.push(e.id); state.total += e.w;
        emit(`选择最小跨界边 ${e.u}–${e.v}，顶点 ${v} 加入树，总权重 ${state.total}。`, 3, [v], [e.id]);
      }
    }
    state.queue = [];
    emit(state.chosen.length === n - 1 ? `最小生成树完成：${n - 1} 条边，总权重 ${state.total}。` : mode === 'kruskal' ? `图不连通，不存在覆盖全图的生成树。得到最小生成森林，权重 ${state.total}。` : `图不连通，不存在覆盖全图的生成树。仅得到起点所在分量的树，权重 ${state.total}。`, 5);
  } else {
    state.dist[source] = 0;
    if (mode === 'spfa') state.queue.push(source);
    emit(`源点 ${source} 的距离设为 0，其余为 ∞。`);
    if (mode === 'dijkstra') {
      for (let count = 0; count < n; count++) {
        let u = -1;
        for (let v = 0; v < n; v++) if (!state.done.includes(v) && Number.isFinite(state.dist[v]) && (u < 0 || state.dist[v] < state.dist[u])) u = v;
        if (u < 0) break;
        state.done.push(u);
        emit(`未确定顶点中 ${u} 距离最小，确定 dist[${u}] = ${state.dist[u]}。`, 1, [u]);
        for (const e of edges.filter(e => e.u === u && !state.done.includes(e.v))) {
          const result = relax(e); emit(result.message, result.changed ? 3 : 2, [u, e.v], [e.id]);
        }
      }
    } else if (mode === 'bellman') {
      for (let round = 1; round <= n; round++) {
        let changed = false;
        emit(`第 ${round} 轮：扫描所有边${round === n ? '，检测可达负环' : ''}。`, 1);
        for (const e of edges) {
          const result = relax(e); changed ||= result.changed;
          emit(result.message, result.changed ? 3 : 2, [e.u, e.v], [e.id]);
        }
        if (!changed) { emit('本轮没有更新，可以提前结束。', 4); break; }
        if (round === n) state.negative = true;
      }
    } else {
      // Count edges on the improving walk, not number of enqueues.
      const depth = Array(n).fill(0);
      while (state.queue.length && !state.negative) {
        const u = state.queue.shift();
        emit(`顶点 ${u} 出队，检查它的出边。`, 1, [u]);
        for (const e of edges.filter(e => e.u === u)) {
          const result = relax(e);
          if (result.changed) {
            depth[e.v] = depth[u] + 1;
            if (depth[e.v] >= n) state.negative = true;
            else if (!state.queue.includes(e.v)) state.queue.push(e.v);
          }
          emit(result.message + (result.changed ? ` 改善路径边数 ${depth[e.v]}；队列按需入队。` : ''), result.changed ? 3 : 2, [u, e.v], [e.id]);
          if (state.negative) break;
        }
      }
    }
    emit(state.negative ? '检测到源点可达的负环，受影响顶点不存在有限最短路。停止演示，表中数值是检测时的暂存值。' : '完成：dist 为源点到各顶点的最短距离，∞ 表示不可达。', 5);
  }
  return frames;
}
export function fmt(value) { return value === Infinity ? '∞' : String(value); }
