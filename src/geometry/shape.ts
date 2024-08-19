import { dist, sub, equal } from '../utils';
import { contour, ring } from './primitive';
import { line as pathLine, area as pathArea, sector as pathSector } from './d';

export function rect(
  renderer: {
    rect?: any;
    path: any;
    circle?: (arg0: { fill: string; r: any; cx: any; cy: any }) => any;
  },
  coordinate: {
    (value: any[], index: number, array: any[][]): any;
    isTranspose?: any;
    isPolar?: any;
    center?: any;
  },
  { x1, y1, x2, y2, ...styles }: { x1: any; y1: any; x2: any; y2: any; fill: any; stroke: any }
) {
  const v0 = [x1, y1];
  const v1 = [x2, y1];
  const v2 = [x2, y2];
  const v3 = [x1, y2];
  const vs = coordinate.isTranspose() ? [v3, v0, v1, v2] : [v0, v1, v2, v3];
  const ps = vs.map(coordinate);
  const [p0, p1, p2, p3] = ps;

  if (!coordinate.isPolar()) {
    const [width, height] = sub(p2, p0);
    const [x, y] = p0;
    return renderer.rect({ x, y, width, height, ...styles });
  }

  const center = coordinate.center();
  const [cx, cy] = center;

  if (!(equal(p0, p1) && equal(p2, p3))) {
    return renderer.path({ d: pathSector([center, ...ps]), ...styles });
  }

  const r1 = dist(center, p2);
  const r2 = dist(center, p0);
  return ring(renderer, { cx, cy, r1, r2, ...styles });
}

export function circle(
  renderer: { circle: (arg0: { cx: any; cy: any; r: any }) => any },
  coordinate: (arg0: any[]) => [any, any],
  { cx, cy, r, ...styles }: { cx: any; cy: any; r: any; fill: any; stroke: any }
) {
  const [px, py] = coordinate([cx, cy]);
  return renderer.circle({ cx: px, cy: py, r, ...styles });
}

export function line(
  renderer: { path: (arg0: { d: any[][] }) => any },
  coordinate: { (arg0: any[]): any; (arg0: any[]): any; isPolar: any },
  { X, Y, I: I0, ...styles }: { X: any; Y: any; I: any; fill: string; stroke: any }
) {
  const I = coordinate.isPolar() ? [...I0, I0[0]] : I0;
  const points = I.map((i: string | number) => coordinate([X[i], Y[i]]));
  const d = pathLine(points);
  return renderer.path({ d, ...styles });
}

export function area(
  renderer: { path: any },
  coordinate: { (value: any, index: number, array: any[]): any; isPolar?: any },
  { X1, Y1, X2, Y2, I: I0, ...styles }: any
) {
  const I = coordinate.isPolar() ? [...I0, I0[0]] : I0;
  const points = [
    ...I.map((i: string | number) => [X1[i], Y1[i]]),
    ...I.map((i: string | number) => [X2[i], Y2[i]]).reverse()
  ].map(coordinate);

  if (coordinate.isPolar()) {
    return contour(renderer, { points, ...styles });
  }
  return renderer.path({ d: pathArea(points), ...styles });
}

export function text(
  renderer: {
    save: () => void;
    translate: (arg0: any, arg1: any) => void;
    rotate: (arg0: any) => void;
    text: (arg0: { text: any; x: number; y: number }) => any;
    restore: () => void;
  },
  coordinate: (arg0: any[]) => [any, any],
  { x, y, rotate, text, ...styles }: any
) {
  const [px, py] = coordinate([x, y]);
  renderer.save();
  renderer.translate(px, py);
  renderer.rotate(rotate);
  const textElement = renderer.text({ text, x: 0, y: 0, ...styles });
  renderer.restore();
  return textElement;
}

export function link(
  renderer: { line: (arg0: { x1: any; y1: any; x2: any; y2: any }) => any },
  coordinate: (value: any[], index: number, array: any[][]) => any,
  { x1, y1, x2, y2, ...styles }: { x1: any; y1: any; x2: any; y2: any; fill: any; stroke: any }
) {
  const [p0, p1] = [
    [x1, y1],
    [x2, y2]
  ].map(coordinate);
  return renderer.line({ x1: p0[0], y1: p0[1], x2: p1[0], y2: p1[1], ...styles });
}

export function path(renderer: { path: (arg0: any) => any }, coordinate: any, attributes: any) {
  return renderer.path(attributes);
}
