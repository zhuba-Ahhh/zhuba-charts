import { area as pathArea, line as pathLine, ring as pathRing } from './d';

export function ring(
  renderer: {
    path: (arg0: { d: any[][]; stroke: string }) => any;
    circle: (arg0: { fill: string; r: any; cx: any; cy: any }) => any;
  },
  { cx, cy, r1, r2, ...styles }: { cx: any; cy: any; r1: number; r2: number }
) {
  const ring = renderer.path({
    ...styles,
    d: pathRing([
      [cx, cy],
      [r1, r2]
    ]),
    stroke: 'none'
  });
  const innerStroke = renderer.circle({ ...styles, fill: 'none', r: r1, cx, cy });
  const outerStroke = renderer.circle({ ...styles, fill: 'none', r: r2, cx, cy });
  return [innerStroke, ring, outerStroke];
}

export function contour(
  renderer: { path: (arg0: { stroke?: string; d: any[][]; fill?: string }) => any },
  { points, ...styles }: { points: any[] }
) {
  const end = points.length;
  const mid = end / 2;
  const contour = renderer.path({ d: pathArea(points), ...styles, stroke: 'none' });
  const outerStroke = renderer.path({ d: pathLine(points.slice(0, mid)), ...styles, fill: 'none' });
  const innerStroke = renderer.path({
    d: pathLine(points.slice(mid, end)),
    ...styles,
    fill: 'none'
  });
  return [innerStroke, contour, outerStroke];
}
