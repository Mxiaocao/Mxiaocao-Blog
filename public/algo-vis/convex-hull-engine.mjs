export const examples = {
  general: { label: '一般点集', text: '-8 -3\n-6 5\n-3 -6\n0 7\n6 5\n8 -2\n3 -7\n-3 1\n1 2\n4 -2\n0 -3' },
  collinear: { label: '全部共线', text: '-8 -4\n-4 -2\n0 0\n4 2\n8 4' },
  boundary: { label: '边界共线与重复点', text: '-6 -6\n0 -6\n6 -6\n6 0\n6 6\n0 6\n-6 6\n-6 0\n0 0\n-6 -6' },
  small: { label: '只有两个点', text: '-5 -3\n5 3' },
};

export function parsePoints(text) {
  const lines = text.trim() ? text.trim().split(/\r?\n/) : [];
  if (lines.length > 30) throw new Error('最多输入 30 个点（含重复点）。');
  return lines.map((line, i) => {
    const values = line.trim().split(/\s+/).map(Number);
    if (values.length !== 2 || !values.every(v => Number.isInteger(v) && Math.abs(v) <= 10)) {
      throw new Error(`第 ${i + 1} 行：请输入两个 -10～10 的整数坐标，以空格分隔。`);
    }
    return { x: values[0], y: values[1], id: i + 1 };
  });
}

export const cross = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);

export function measure(hull) {
  let twiceArea = 0, perimeter = 0;
  if (hull.length > 1) for (let i = 0; i < hull.length; i++) {
    const a = hull[i], b = hull[(i + 1) % hull.length];
    twiceArea += a.x * b.y - a.y * b.x;
    perimeter += Math.hypot(b.x - a.x, b.y - a.y);
  }
  return { area: Math.abs(twiceArea) / 2, perimeter };
}

// Mirrors the article's single-stack Andrew implementation, including lower_size.
export function convexTrace(input) {
  const points = [...input].sort((a, b) => a.x - b.x || a.y - b.y)
    .filter((p, i, all) => i === 0 || p.x !== all[i - 1].x || p.y !== all[i - 1].y);
  const frames = [], hull = [];
  let lower = [], phase = '排序', boundary = 0;
  const emit = (message, line, extra = {}) => frames.push(structuredClone({
    hull, lower, phase, boundary, message, line, current: null,
    triple: [], turn: null, removed: null, complete: false, ...extra,
  }));
  emit(`按 x、y 排序并去重：${input.length} 个输入点，${points.length} 个不同点。共线时只保留凸包边的端点。`, 0);
  if (points.length <= 2) {
    hull.push(...points); phase = '完成';
    emit(points.length === 0 ? '点集为空，凸包为空。可点击坐标平面添加点。' : points.length === 1 ? '只有一个不同点，凸包退化为这个点。' : '只有两个不同点，凸包退化为线段。', 1, { complete: true });
    return { points, frames };
  }
  const scan = (p, minimum, line) => {
    emit(`考察 P${p.id} (${p.x}, ${p.y})，检查当前栈顶。`, line, { current: p });
    while (hull.length >= minimum) {
      const a = hull.at(-2), b = hull.at(-1), turn = cross(a, b, p);
      const extra = { current: p, triple: [a, b, p], turn };
      emit(`cross(P${a.id}, P${b.id}, P${p.id}) = ${turn}：${turn > 0 ? '左转，保留栈顶' : turn === 0 ? '共线，移除中间点' : '右转，需要弹出栈顶'}。`, 3, extra);
      if (turn > 0) break;
      hull.pop();
      emit(`弹出 P${b.id}，继续用新的栈顶检查 P${p.id}。`, 4, { ...extra, removed: b });
    }
    hull.push(p);
    emit(`P${p.id} 入栈；当前栈包含 ${hull.length} 个点。`, 5, { current: p });
  };
  phase = '下凸壳';
  for (const p of points) scan(p, 2, 2);
  lower = [...hull]; boundary = hull.length; phase = '上凸壳';
  emit(`下凸壳完成，lower_size = ${boundary}。逆序扫描，保留下凸壳部分。`, 6);
  for (let i = points.length - 2; i >= 0; i--) scan(points[i], boundary + 1, 6);
  hull.pop(); phase = '完成';
  emit(hull.length === 2 ? '所有点共线：只保留两端点，凸包退化为线段。' : `移除重复起点，得到逆时针排列的 ${hull.length} 个凸包顶点。`, 7, { complete: true });
  return { points, frames };
}
