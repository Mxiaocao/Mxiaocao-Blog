import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { parseGraph, trace, presets } from '../public/algo-vis/algorithms.mjs';

const graph = (preset, mode = 'spfa') => parseGraph(presets[preset].text, presets[preset].n, mode);
const last = (mode, g, s = 0) => trace(mode, g, s).at(-1);
test('shortest paths agree with independently known distances', () => {
  for (const mode of ['dijkstra', 'spfa', 'bellman']) assert.deepEqual(last(mode, graph('positive')).dist, [0, 3, 2, 6, 6, 7]);
  for (const mode of ['spfa', 'bellman']) assert.deepEqual(last(mode, graph('negative')).dist, [0, 1, 2, 4, 6, 4]);
  assert.deepEqual(last('floyd', graph('negative')).matrix[0], [0, 1, 2, 4, 6, 4]);
});
test('reachable negative cycles stop, unreachable cycles do not poison single-source paths', () => {
  for (const mode of ['spfa', 'bellman', 'floyd']) assert.equal(last(mode, graph('cycle')).negative, true);
  const g = parseGraph('0 1 3\n2 3 -2\n3 2 1', 4, 'spfa');
  for (const mode of ['spfa', 'bellman']) {
    assert.equal(last(mode, g).negative, false);
    assert.deepEqual(last(mode, g).dist, [0, 3, Infinity, Infinity]);
  }
  assert.equal(last('floyd', g).negative, true);
});
test('MST algorithms return known total and distinguish a disconnected graph', () => {
  for (const mode of ['prim', 'kruskal']) {
    const f = last(mode, graph('positive', mode));
    assert.equal(f.total, 9); assert.equal(f.chosen.length, 5);
    assert.match(last(mode, graph('disconnected', mode)).message, /不连通/);
  }
  assert.equal(last('kruskal', graph('disconnected', 'kruskal')).total, 8);
  assert.equal(last('prim', graph('disconnected', 'prim')).total, 5);
});
test('snapshots preserve Infinity and do not share arrays', () => {
  const frames = trace('spfa', graph('positive'));
  assert.equal(frames[0].dist[1], Infinity);
  frames.at(-1).dist[1] = 999;
  assert.equal(frames[0].dist[1], Infinity);
  for (const mode of ['dijkstra', 'spfa', 'bellman', 'floyd', 'prim', 'kruskal']) {
    const g = parseGraph('', 3, mode);
    assert.ok(trace(mode, g).length > 1);
  }
});
test('input rejects malformed graphs and unsupported Dijkstra weights', () => {
  for (const [text, n, mode] of [['0 1 -1', 2, 'dijkstra'], ['0 2 3', 2, 'spfa'], ['0 0 1', 2, 'floyd'], ['0 1 2\n1 0 3', 2, 'prim'], ['0 1 NaN', 2, 'spfa'], ['', 9, 'prim'], ['0 1 1.5', 2, 'spfa']]) assert.throws(() => parseGraph(text, n, mode));
});
test('seeded graphs: shortest paths match Floyd, MST matches exhaustive spanning tree oracle', () => {
  let seed = 793;
  const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2 ** 32; };
  for (let trial = 0; trial < 30; trial++) {
    const n = 5, edges = [];
    for (let u = 0; u < n; u++) for (let v = u + 1; v < n; v++) if (rand() < .65) edges.push(`${u} ${v} ${Math.floor(rand() * 10)}`);
    const g = parseGraph(edges.join('\n'), n, 'dijkstra');
    const matrix = last('floyd', g).matrix;
    for (let s = 0; s < n; s++) for (const mode of ['dijkstra', 'spfa', 'bellman']) assert.deepEqual(last(mode, g, s).dist, matrix[s]);
    let optimum = Infinity;
    for (let mask = 0; mask < 2 ** g.edges.length; mask++) {
      const subset = g.edges.filter((_, i) => mask & (1 << i));
      if (subset.length !== n - 1) continue;
      const reached = new Set([0]);
      for (let round = 0; round < n; round++) for (const e of subset) if (reached.has(e.u) || reached.has(e.v)) { reached.add(e.u); reached.add(e.v); }
      if (reached.size === n) optimum = Math.min(optimum, subset.reduce((sum, e) => sum + e.w, 0));
    }
    for (const mode of ['kruskal', 'prim']) {
      const f = last(mode, g);
      if (optimum < Infinity) assert.equal(f.total, optimum);
      else assert.ok(f.chosen.length < n - 1);
    }
  }
});
test('graph article embeds all have local standalone implementations and accessible titles', () => {
  let count = 0;
  for (const file of readdirSync('src/content/posts/algorithms/图论')) {
    const text = readFileSync(`src/content/posts/algorithms/图论/${file}`, 'utf8');
    for (const match of text.matchAll(/<iframe[^>]+src="(\/algo-vis\/[^" ]+)"[^>]*>/g)) {
      count++; assert.match(match[0], /title="[^"]+"/); assert.ok(existsSync(`public${match[1]}`));
    }
  }
  assert.equal(count, 5);
});
