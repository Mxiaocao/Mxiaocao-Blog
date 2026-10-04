import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parsePoints, convexTrace, cross, measure, examples } from '../public/algo-vis/convex-hull-engine.mjs';

const result = text => convexTrace(parsePoints(text)).frames.at(-1).hull;
const coords = points => points.map(p => `${p.x},${p.y}`).sort();

test('square removes interior, duplicate, and collinear boundary points', () => {
  const hull = result(examples.boundary.text);
  assert.deepEqual(coords(hull), ['-6,-6', '-6,6', '6,-6', '6,6']);
  assert.deepEqual(measure(hull), { area: 144, perimeter: 48 });
  for (let i = 0; i < hull.length; i++) assert.ok(cross(hull[i], hull[(i + 1) % 4], hull[(i + 2) % 4]) > 0);
});
test('empty, singleton, duplicate, pair, vertical and horizontal collinear inputs', () => {
  assert.deepEqual(result(''), []);
  assert.equal(result('1 2\n1 2').length, 1);
  assert.deepEqual(measure(result('1 2')), { area: 0, perimeter: 0 });
  assert.deepEqual(measure(result('0 0\n3 4')), { area: 0, perimeter: 10 });
  assert.deepEqual(coords(result(examples.collinear.text)), ['-8,-4', '8,4']);
  assert.deepEqual(coords(result('0 -5\n0 0\n0 5\n0 2')), ['0,-5', '0,5']);
  assert.deepEqual(coords(result('-5 0\n0 0\n5 0\n2 0')), ['-5,0', '5,0']);
});
test('trace exposes turns, pops, both scans and independent reversible states', () => {
  const { frames } = convexTrace(parsePoints(examples.general.text));
  assert.ok(frames.some(f => f.phase === '上凸壳'));
  assert.ok(frames.some(f => f.phase === '下凸壳'));
  assert.ok(frames.some(f => f.removed));
  for (const f of frames.filter(f => f.triple.length)) assert.equal(cross(...f.triple), f.turn);
  assert.equal(frames[0].hull.length, 0);
  frames.at(-1).hull[0].x = 999;
  assert.ok(frames.slice(0, -1).every(f => f.hull.every(p => p.x !== 999)));
});
test('rejects invalid coordinates and excessive point counts', () => {
  for (const text of ['a 1', '1', '1 2 3', 'NaN 0', '11 0', '0 -11', '1.2 3', Array(31).fill('0 0').join('\n')]) assert.throws(() => parsePoints(text));
});
test('100 deterministic random sets agree with independent gift wrapping oracle', () => {
  let seed = 3948;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 2 ** 32; };
  // Jarvis march: choose an extreme supporting edge at each vertex, no sorting/stack.
  function jarvis(points) {
    const unique = [...new Map(points.map(p => [`${p.x},${p.y}`, p])).values()];
    if (unique.length < 2) return unique;
    const start = unique.reduce((a, b) => a.x < b.x || a.x === b.x && a.y < b.y ? a : b);
    const hull = []; let p = start;
    do {
      hull.push(p); let q = unique.find(v => v !== p);
      for (const r of unique) {
        const det = (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x);
        const distance = v => (v.x - p.x) ** 2 + (v.y - p.y) ** 2;
        if (det < 0 || det === 0 && distance(r) > distance(q)) q = r;
      }
      p = q; assert.ok(hull.length <= unique.length);
    } while (p !== start);
    return hull;
  }
  for (let trial = 0; trial < 100; trial++) {
    const text = Array.from({ length: 20 }, () => `${Math.floor(random() * 21) - 10} ${Math.floor(random() * 21) - 10}`).join('\n');
    const points = parsePoints(text), hull = result(text);
    assert.deepEqual(coords(hull), coords(jarvis(points)));
    for (let i = 0; i < hull.length; i++) for (const p of points) assert.ok(cross(hull[i], hull[(i + 1) % hull.length], p) >= 0);
  }
});
test('article embeds the local simulator and corrects C++ equality/cross product', () => {
  const article = readFileSync('src/content/posts/algorithms/计算几何/9-2-Convex-Hull.md', 'utf8');
  assert.match(article, /<iframe title="Andrew 凸包算法交互模拟"[^>]+src="\/algo-vis\/convex-hull.html"/);
  assert.match(article, /return x == o.x && y == o.y;/);
  assert.match(article, /return a.x\*b.y - a.y\*b.x;/);
});
