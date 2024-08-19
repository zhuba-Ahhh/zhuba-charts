function computeFlexViews(box, node) {
  const { type, children, flex = children.map(() => 1), padding = 40 } = node;
  const [mainStart, mainSize, crossSize, crossStart] = type === "col" ? ["y", "height", "width", "x"] : ["x", "width", "height", "y"];
  const sum = flex.reduce((total, value) => total + value);
  const totalSize = box[mainSize] - padding * (children.length - 1);
  const sizes = flex.map((value) => totalSize * (value / sum));
  const childrenViews = [];
  for (let next = box[mainStart], i = 0; i < sizes.length; next += sizes[i] + padding, i += 1) {
    childrenViews.push({
      [mainStart]: next,
      [mainSize]: sizes[i],
      [crossStart]: box[crossStart],
      [crossSize]: box[crossSize]
    });
  }
  return childrenViews;
}
function identity(x) {
  return x;
}
function compose(...fns) {
  return fns.reduce((total, cur) => (x) => cur(total(x)), identity);
}
function curry(fn) {
  const arity = fn.length;
  return function curried(...args) {
    const newArgs = args.length === 0 ? [void 0] : args;
    if (newArgs.length >= arity) return fn(...newArgs);
    return curried.bind(null, ...newArgs);
  };
}
function ceil(n, base) {
  return base * Math.ceil(n / base);
}
function floor(n, base) {
  return base * Math.floor(n / base);
}
function round(n) {
  return Math.round(n * 1e12) / 1e12;
}
function normalize(value, start, stop) {
  return (value - start) / (stop - start);
}
function log(n, base) {
  return Math.log(n) / Math.log(base);
}
function nice(domain, interval2) {
  const [min2, max2] = domain;
  return [interval2.floor(min2), interval2.ceil(max2)];
}
function map(object, transform2 = identity) {
  return Object.entries(object).reduce((obj, [key, value]) => {
    obj[key] = transform2(value, key);
    return obj;
  }, {});
}
function assignDefined(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value !== void 0) target[key] = value;
  }
}
function defined(d) {
  return d !== void 0 && !Number.isNaN(d);
}
function equal([x0, y0], [x1, y1]) {
  return closeTo(x0, x1) && closeTo(y0, y1);
}
function closeTo(x, y, tol = 1e-5) {
  return Math.abs(x - y) < tol;
}
function dist([x0, y0], [x1 = 0, y1 = 0] = []) {
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
}
function sub([x1, y1], [x0, y0]) {
  return [x1 - x0, y1 - y0];
}
function angleBetween(v0, v1) {
  const a0 = angle(v0);
  const a1 = angle(v1);
  if (a0 < a1) return a1 - a0;
  return Math.PI * 2 - (a0 - a1);
}
function angle([x, y]) {
  const theta = Math.atan2(y, x);
  return theta;
}
function degree(radian) {
  return radian * 180 / Math.PI;
}
function unique(points, x = (d) => d[0], y = (d) => d[1]) {
  const overlap = (a, b) => closeTo(x(a), x(b)) && closeTo(y(a), y(b));
  return points.filter((d, index) => points.findIndex((p) => overlap(d, p)) === index);
}
function group(array, key = (d) => d) {
  const keyGroups = /* @__PURE__ */ new Map();
  for (const item of array) {
    const k = key(item);
    const g = keyGroups.get(k);
    if (g) {
      g.push(item);
    } else {
      keyGroups.set(k, [item]);
    }
  }
  return keyGroups;
}
function tickStep(min2, max2, count2) {
  const e10 = Math.sqrt(50);
  const e5 = Math.sqrt(10);
  const e2 = Math.sqrt(2);
  const step0 = Math.abs(max2 - min2) / Math.max(0, count2);
  let step1 = 10 ** Math.floor(Math.log(step0) / Math.LN10);
  const error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return step1;
}
function ticks(min2, max2, count2) {
  if (min2 === max2) return [min2];
  const step = tickStep(min2, max2, count2);
  const start = Math.ceil(min2 / step);
  const stop = Math.floor(max2 / step);
  const n = Math.ceil(stop - start + 1);
  const values = new Array(n);
  for (let i = 0; i < n; i += 1) {
    values[i] = round((start + i) * step);
  }
  return values;
}
function bisect(array, x, lo = 0, hi = array.length, accessor = identity) {
  let i = lo;
  let j = hi;
  while (i < j) {
    const mid = i + j >>> 1;
    if (accessor(array[mid]) < x) {
      i = mid + 1;
    } else {
      j = mid;
    }
  }
  return i;
}
function lastOf(array) {
  return array[array.length - 1];
}
function firstOf(array) {
  return array[0];
}
function indexOf(array) {
  return array.map((_, i) => i);
}
function min(array, accessor) {
  return Math.min(...array.map(accessor));
}
function max(array, accessor) {
  return Math.max(...array.map(accessor));
}
function descendants(root) {
  const nodes = [];
  const push = (d) => nodes.push(d);
  bfs(root, push);
  return nodes;
}
function bfs(root, callback) {
  const discovered = [root];
  while (discovered.length) {
    const node = discovered.pop();
    callback(node);
    discovered.push(...node.children || []);
  }
}
function createSVGElement(type) {
  return document.createElementNS("http://www.w3.org/2000/svg", type);
}
function applyAttributes(element, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    const kebabCaseKey = key.replace(/[A-Z]/g, (d) => `-${d.toLocaleLowerCase()}`);
    element.setAttribute(kebabCaseKey, value);
  }
}
function applyTransform(element, transform2) {
  const oldTransform = element.getAttribute("transform") || "";
  const prefix = oldTransform ? `${oldTransform} ` : "";
  element.setAttribute("transform", `${prefix}${transform2}`);
}
function mount(parent, child) {
  if (parent) {
    parent.appendChild(child);
  }
}
function computeFacetViews(box, {
  data,
  encodings = {},
  padding = 0,
  paddingLeft = 45,
  paddingRight = 45,
  paddingBottom = 45,
  paddingTop = 60
}) {
  const { x, y } = encodings;
  const cols = x ? Array.from(group(data, (d) => d[x]).keys()) : [void 0];
  const rows = y ? Array.from(group(data, (d) => d[y]).keys()) : [void 0];
  const n = cols.length;
  const m = rows.length;
  const views = [];
  const width = box.width - paddingLeft - paddingRight;
  const height = box.height - paddingTop - paddingBottom;
  const boxWidth = (width - padding * (n - 1)) / n;
  const boxHeight = (height - padding * (m - 1)) / m;
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      const transform2 = (data2) => {
        const inRow = (d) => d[x] === cols[i] || cols[i] === void 0;
        const inCol = (d) => d[y] === rows[j] || rows[j] === void 0;
        return data2.filter((d) => inRow(d) && inCol(d));
      };
      views.push({
        x: paddingLeft + box.x + padding * i + i * boxWidth,
        y: paddingRight + box.y + padding * j + j * boxHeight,
        width: boxWidth,
        height: boxHeight,
        transform: transform2
      });
    }
  }
  return views;
}
function computeLayerViews(box, node) {
  const { children = [] } = node;
  return new Array(children.length).fill(0).map(() => ({ ...box }));
}
function createViews(root, computes = {
  layer: computeLayerViews,
  col: computeFlexViews,
  row: computeFlexViews,
  facet: computeFacetViews
}) {
  const nodes = descendants(root);
  const { width = 640, height = 480, x = 0, y = 0 } = root;
  const rootView = { width, height, x, y };
  const nodeView = /* @__PURE__ */ new Map([[root, rootView]]);
  for (const node of nodes) {
    const view = nodeView.get(node);
    const { children = [], type } = node;
    const computeChildrenViews = computes[type];
    if (computeChildrenViews) {
      const childrenViews = computeChildrenViews(view, node);
      if (computeChildrenViews !== computeFacetViews) {
        for (const [i, child] of Object.entries(children)) {
          nodeView.set(child, childrenViews[i]);
        }
      } else {
        for (const child of children) {
          for (const view2 of childrenViews) {
            nodeView.set({ ...child }, view2);
          }
        }
      }
    }
  }
  const key = (d) => `${d.x}-${d.y}-${d.width}-${d.height}`;
  const keyViews = group(Array.from(nodeView.entries()), ([, view]) => key(view));
  return Array.from(keyViews.values()).map((views) => {
    const view = views[0][1];
    const nodes2 = views.map((d) => d[0]);
    return [view, nodes2];
  });
}
function createContext(width, height) {
  const svg = createSVGElement("svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  const g = createSVGElement("g");
  mount(svg, g);
  return {
    node: svg,
    group: g
  };
}
function line$3(context, attributes) {
  return shape("line", context, attributes);
}
function rect$2(context, attributes) {
  const { width, height, x, y } = attributes;
  return shape("rect", context, {
    ...attributes,
    width: Math.abs(width),
    height: Math.abs(height),
    x: width > 0 ? x : x + width,
    y: height > 0 ? y : y + height
  });
}
function path$2(context, attributes) {
  const { d } = attributes;
  const path2 = Array.isArray(d) ? d.flat().join(" ") : d;
  return shape("path", context, { ...attributes, d: path2 });
}
function circle$1(context, attributes) {
  return shape("circle", context, attributes);
}
function text$2(context, attributes) {
  const { text: text2, ...rest } = attributes;
  const textElement = shape("text", context, rest);
  textElement.textContent = text2;
  return textElement;
}
function shape(type, context, attributes) {
  const { group: group2 } = context;
  const el = createSVGElement(type);
  applyAttributes(el, attributes);
  mount(group2, el);
  return el;
}
function translate$1(context, tx, ty) {
  transform$1("translate", context, tx, ty);
}
function rotate(context, theta) {
  transform$1("rotate", context, theta);
}
function scale$1(context, sx, sy) {
  transform$1("scale", context, sx, sy);
}
function save(context) {
  const { group: group2 } = context;
  const newGroup = createSVGElement("g");
  mount(group2, newGroup);
  context.group = newGroup;
}
function restore(context) {
  const { group: group2 } = context;
  const { parentNode } = group2;
  context.group = parentNode;
}
function transform$1(type, context, ...params) {
  const { group: group2 } = context;
  applyTransform(group2, `${type}(${params.join(", ")})`);
}
function createRenderer(width, height, {
  line: drawLine = line$3,
  circle: drawCircle = circle$1,
  text: drawText = text$2,
  rect: drawRect = rect$2,
  path: drawPath = path$2,
  context: intensifyContext = (d) => d
} = {}) {
  const context = intensifyContext(createContext(width, height));
  return {
    line: (attributes) => drawLine(context, attributes),
    circle: (attributes) => drawCircle(context, attributes),
    text: (attributes) => drawText(context, attributes),
    rect: (attributes) => drawRect(context, attributes),
    path: (attributes) => drawPath(context, attributes),
    restore: () => restore(context),
    save: () => save(context),
    scale: (...args) => scale$1(context, ...args),
    rotate: (...args) => rotate(context, ...args),
    translate: (...args) => translate$1(context, ...args),
    node: () => context.node,
    group: () => context.group
  };
}
const createCoordinate = ({ transforms: coordinates = [], ...canvasOptions }) => {
  const transforms = coordinates.flatMap((coordinate2) => coordinate2(canvasOptions));
  const types = transforms.map((d) => d.type());
  const output = compose(...transforms);
  const { x, y, width, height } = canvasOptions;
  output.isPolar = () => types.indexOf("polar") !== -1;
  output.isTranspose = () => types.reduce((is, type) => is ^ type === "transpose", false);
  output.center = () => [x + width / 2, y + height / 2];
  return output;
};
const transpose$1 = () => {
  return transform("transpose", ([px, py]) => [py, px]);
};
const translate = (tx = 0, ty = 0) => {
  return transform("translate", ([px, py]) => [px + tx, py + ty]);
};
const scale = (sx = 1, sy = 1) => {
  return transform("scale", ([px, py]) => [px * sx, py * sy]);
};
const reflectX = () => {
  return transform("reflectX", scale(-1, 1));
};
const reflectY = () => {
  return transform("reflectY", scale(1, -1));
};
const polar$1 = () => {
  return transform("polar", ([theta, radius]) => {
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    return [x, y];
  });
};
const transform = (type, transformer) => {
  transformer.type = () => type;
  return transformer;
};
const coordinate$2 = (transformOptions, canvasOptions) => {
  const { x, y, width, height } = canvasOptions;
  return [scale(width, height), translate(x, y)];
};
const cartesian = curry(coordinate$2);
const coordinate$1 = (transformOptions, canvasOptions) => {
  const { width, height } = canvasOptions;
  const {
    innerRadius = 0,
    outerRadius = 1,
    startAngle = -Math.PI / 2,
    endAngle = Math.PI / 2 * 3
  } = transformOptions;
  const aspect = width / height;
  const sx = aspect > 1 ? 1 / aspect : 1;
  const sy = aspect > 1 ? 1 : aspect;
  return [
    translate(0, -0.5),
    reflectY(),
    translate(0, 0.5),
    scale(endAngle - startAngle, outerRadius - innerRadius),
    translate(startAngle, innerRadius),
    polar$1(),
    scale(sx, sy),
    scale(0.5, 0.5),
    translate(0.5, 0.5)
  ];
};
const polar = curry(coordinate$1);
const coordinate = (transformOptions, canvasOptions) => {
  return [transpose$1(), translate(-0.5, -0.5), reflectX(), translate(0.5, 0.5)];
};
const transpose = curry(coordinate);
function createChannel$1({ name, optional = true, ...rest }) {
  return { name, optional, ...rest };
}
function createChannels(options = {}) {
  return {
    x: createChannel$1({ name: "x", optional: false }),
    y: createChannel$1({ name: "y", optional: false }),
    stroke: createChannel$1({ name: "stroke" }),
    fill: createChannel$1({ name: "fill" }),
    ...options
  };
}
const channelStyles = (index, channels2) => {
  const { stroke: S, fill: F } = channels2;
  return {
    ...S && { stroke: S[index] },
    ...F && { fill: F[index] }
  };
};
const groupChannelStyles = ([index], channels2) => {
  return channelStyles(index, channels2);
};
function line$2([p0, ...points]) {
  return [["M", ...p0], ...points.map((p) => ["L", ...p])];
}
function area$2(points) {
  return [...line$2(points), ["Z"]];
}
function sector([c, p0, p1, p2, p3]) {
  const r = dist(c, p0);
  const r1 = dist(c, p2);
  const a = angleBetween(sub(p0, c), sub(p1, c));
  const l = a > Math.PI ? 1 : 0;
  const l1 = a > Math.PI ? 1 : 0;
  return [
    ["M", p0[0], p0[1]],
    ["A", r, r, 0, l, 1, p1[0], p1[1]],
    ["L", p2[0], p2[1]],
    ["A", r1, r1, 0, l1, 0, p3[0], p3[1]],
    ["Z"]
  ];
}
function ring$1([c, [r1, r2]]) {
  const [cx, cy] = c;
  const p0 = [cx, cy - r2];
  const p1 = [cx, cy + r2];
  const p2 = [cx, cy + r1];
  const p3 = [cx, cy - r1];
  return [...sector([c, p0, p1, p2, p3]), ...sector([c, p1, p0, p3, p2])];
}
function ring(renderer, { cx, cy, r1, r2, ...styles }) {
  const ring2 = renderer.path({
    ...styles,
    d: ring$1([
      [cx, cy],
      [r1, r2]
    ]),
    stroke: "none"
  });
  const innerStroke = renderer.circle({ ...styles, fill: "none", r: r1, cx, cy });
  const outerStroke = renderer.circle({ ...styles, fill: "none", r: r2, cx, cy });
  return [innerStroke, ring2, outerStroke];
}
function contour(renderer, { points, ...styles }) {
  const end = points.length;
  const mid = end / 2;
  const contour2 = renderer.path({ d: area$2(points), ...styles, stroke: "none" });
  const outerStroke = renderer.path({ d: line$2(points.slice(0, mid)), ...styles, fill: "none" });
  const innerStroke = renderer.path({
    d: line$2(points.slice(mid, end)),
    ...styles,
    fill: "none"
  });
  return [innerStroke, contour2, outerStroke];
}
function rect$1(renderer, coordinate2, { x1, y1, x2, y2, ...styles }) {
  const v0 = [x1, y1];
  const v1 = [x2, y1];
  const v2 = [x2, y2];
  const v3 = [x1, y2];
  const vs = coordinate2.isTranspose() ? [v3, v0, v1, v2] : [v0, v1, v2, v3];
  const ps = vs.map(coordinate2);
  const [p0, p1, p2, p3] = ps;
  if (!coordinate2.isPolar()) {
    const [width, height] = sub(p2, p0);
    const [x, y] = p0;
    return renderer.rect({ x, y, width, height, ...styles });
  }
  const center = coordinate2.center();
  const [cx, cy] = center;
  if (!(equal(p0, p1) && equal(p2, p3))) {
    return renderer.path({ d: sector([center, ...ps]), ...styles });
  }
  const r1 = dist(center, p2);
  const r2 = dist(center, p0);
  return ring(renderer, { cx, cy, r1, r2, ...styles });
}
function circle(renderer, coordinate2, { cx, cy, r, ...styles }) {
  const [px, py] = coordinate2([cx, cy]);
  return renderer.circle({ cx: px, cy: py, r, ...styles });
}
function line$1(renderer, coordinate2, { X, Y, I: I0, ...styles }) {
  const I = coordinate2.isPolar() ? [...I0, I0[0]] : I0;
  const points = I.map((i) => coordinate2([X[i], Y[i]]));
  const d = line$2(points);
  return renderer.path({ d, ...styles });
}
function area$1(renderer, coordinate2, { X1, Y1, X2, Y2, I: I0, ...styles }) {
  const I = coordinate2.isPolar() ? [...I0, I0[0]] : I0;
  const points = [
    ...I.map((i) => [X1[i], Y1[i]]),
    ...I.map((i) => [X2[i], Y2[i]]).reverse()
  ].map(coordinate2);
  if (coordinate2.isPolar()) {
    return contour(renderer, { points, ...styles });
  }
  return renderer.path({ d: area$2(points), ...styles });
}
function text$1(renderer, coordinate2, { x, y, rotate: rotate2, text: text2, ...styles }) {
  const [px, py] = coordinate2([x, y]);
  renderer.save();
  renderer.translate(px, py);
  renderer.rotate(rotate2);
  const textElement = renderer.text({ text: text2, x: 0, y: 0, ...styles });
  renderer.restore();
  return textElement;
}
function link$1(renderer, coordinate2, { x1, y1, x2, y2, ...styles }) {
  const [p0, p1] = [
    [x1, y1],
    [x2, y2]
  ].map(coordinate2);
  return renderer.line({ x1: p0[0], y1: p0[1], x2: p1[0], y2: p1[1], ...styles });
}
function path$1(renderer, coordinate2, attributes) {
  return renderer.path(attributes);
}
function createGeometry(channels2, render2) {
  const geometry = (renderer, I, scales, values, styles, coordinate2) => {
    for (const [key, { optional, scale: scale2 }] of Object.entries(channels2)) {
      if (!optional) {
        if (!values[key]) throw new Error(`Missing Channel: ${key}`);
        if (scale2 === "band" && (!scales[key] || !scales[key].bandWidth)) {
          throw new Error(`${key} channel needs band scale.`);
        }
      }
    }
    return render2(renderer, I, scales, values, styles, coordinate2);
  };
  geometry.channels = () => channels2;
  return geometry;
}
const channels$8 = createChannels({
  x: createChannel$1({ name: "x", scale: "band", optional: false }),
  z: createChannel$1({ name: "z", scale: "band" }),
  y1: createChannel$1({ name: "y1", optional: false })
});
function render$8(renderer, I, scales, values, directStyles, coordinate2) {
  const defaults = {
    z: 0,
    x: 0
  };
  const { x, z } = scales;
  const { x: X, y: Y, y1: Y1, z: Z = [] } = values;
  const groupWidth = x.bandWidth();
  const intervalWidth = z && z.bandWidth ? z.bandWidth() : 1;
  const width = groupWidth * intervalWidth;
  return Array.from(I, (i) => {
    const { z: dz, x: dx, ...restDefaults } = defaults;
    const offset = (Z[i] || dz) * groupWidth;
    const x1 = (X[i] || dx) + offset;
    return rect$1(renderer, coordinate2, {
      ...restDefaults,
      ...directStyles,
      ...channelStyles(i, values),
      x1,
      y1: Y[i],
      x2: x1 + width,
      y2: Y1[i]
    });
  });
}
const interval = createGeometry(channels$8, render$8);
const channels$7 = createChannels({
  x: createChannel$1({ name: "x", scale: "band", optional: false }),
  y: createChannel$1({ name: "y", scale: "band", optional: false })
});
function render$7(renderer, I, scales, values, directStyles, coordinate2) {
  const defaults = {};
  const { x, y } = scales;
  const { x: X, y: Y } = values;
  const width = x.bandWidth();
  const height = y.bandWidth();
  return Array.from(
    I,
    (i) => rect$1(renderer, coordinate2, {
      ...defaults,
      ...directStyles,
      ...channelStyles(i, values),
      x1: X[i],
      y1: Y[i],
      x2: X[i] + width,
      y2: Y[i] + height
    })
  );
}
const cell = createGeometry(channels$7, render$7);
const channels$6 = createChannels({
  x1: createChannel$1({ name: "x1", optional: false }),
  y1: createChannel$1({ name: "y1", optional: false })
});
function render$6(renderer, I, scales, values, directStyles, coordinate2) {
  const defaults = {};
  const { x: X, y: Y, x1: X1, y1: Y1 } = values;
  return Array.from(
    I,
    (i) => rect$1(renderer, coordinate2, {
      ...defaults,
      ...directStyles,
      ...channelStyles(i, values),
      x1: X[i],
      y1: Y[i],
      x2: X1[i],
      y2: Y1[i]
    })
  );
}
const rect = createGeometry(channels$6, render$6);
const channels$5 = createChannels({
  z: createChannel$1({ name: "z" })
});
function render$5(renderer, I, scales, values, directStyles, coordinate2) {
  const defaults = {};
  const { x: X, y: Y, z: Z } = values;
  const series = Z ? group(I, (i) => Z[i]).values() : [I];
  return Array.from(
    series,
    (I2) => line$1(renderer, coordinate2, {
      ...defaults,
      ...directStyles,
      ...groupChannelStyles(I2, values),
      X,
      Y,
      I: I2,
      fill: "none"
    })
  );
}
const line = createGeometry(channels$5, render$5);
const channels$4 = createChannels({
  r: createChannel$1({ name: "r" })
});
function render$4(renderer, I, scales, values, directStyles, coordinate2) {
  const defaults = {
    r: 3,
    fill: "none"
  };
  const { x: X, y: Y, r: R = [] } = values;
  return Array.from(I, (i) => {
    const { r: dr, ...restDefaults } = defaults;
    const r = R[i] || dr;
    return circle(renderer, coordinate2, {
      ...restDefaults,
      ...directStyles,
      ...channelStyles(i, values),
      cx: X[i],
      cy: Y[i],
      r
    });
  });
}
const point = createGeometry(channels$4, render$4);
const channels$3 = createChannels({
  x1: createChannel$1({ name: "x1", optional: false }),
  y1: createChannel$1({ name: "y1", optional: false }),
  z: createChannel$1({ name: "z" })
});
function render$3(renderer, I, scales, values, directStyles, coordinate2) {
  const defaults = {};
  const { x: X, y: Y, z: Z, x1: X1, y1: Y1 } = values;
  const series = Z ? group(I, (i) => Z[i]).values() : [I];
  return Array.from(
    series,
    (I2) => area$1(renderer, coordinate2, {
      ...defaults,
      ...directStyles,
      ...groupChannelStyles(I2, values),
      X1: X,
      Y1: Y,
      X2: X1,
      Y2: Y1,
      I: I2
    })
  );
}
const area = createGeometry(channels$3, render$3);
const channels$2 = createChannels({
  rotate: createChannel$1({ name: "rotate" }),
  fontSize: createChannel$1({ name: "fontSize" }),
  fontWeight: createChannel$1({ name: "fontWeight" }),
  text: createChannel$1({ name: "text", optional: false, scale: "identity" })
});
function render$2(renderer, I, scales, values, directStyles, coordinate2) {
  const defaults = {
    rotate: 0,
    fontSize: 14,
    fontWeight: "normal"
  };
  const { x: X, y: Y, text: T, rotate: R = [], fontSize: FS = [], fontWeight: FW = [] } = values;
  return Array.from(
    I,
    (i) => text$1(renderer, coordinate2, {
      ...directStyles,
      ...channelStyles(i, values),
      x: X[i],
      y: Y[i],
      rotate: R[i] || defaults.rotate,
      fontSize: FS[i] || defaults.fontSize,
      fontWeight: FW[i] || defaults.fontWeight,
      text: T[i]
    })
  );
}
const text = createGeometry(channels$2, render$2);
const channels$1 = createChannels({
  x1: createChannel$1({ name: "x1", optional: false }),
  y1: createChannel$1({ name: "y1", optional: false })
});
function render$1(renderer, I, scales, values, directStyles, coordinate2) {
  const defaults = {};
  const { x: X, y: Y, x1: X1, y1: Y1 } = values;
  return Array.from(
    I,
    (i) => link$1(renderer, coordinate2, {
      ...defaults,
      ...directStyles,
      ...channelStyles(i, values),
      x1: X[i],
      y1: Y[i],
      x2: X1[i],
      y2: Y1[i]
    })
  );
}
const link = createGeometry(channels$1, render$1);
const channels = {
  d: createChannel$1({ name: "d", optional: false, scale: "identity" }),
  fill: createChannel$1({ name: "fill" }),
  stroke: createChannel$1({ name: "stroke" })
};
function render(renderer, I, scales, values, directStyles, coordinate2) {
  const defaults = {};
  const { d: D } = values;
  return Array.from(
    I,
    (i) => path$1(renderer, coordinate2, {
      ...defaults,
      ...directStyles,
      ...channelStyles(i, values),
      d: D[i]
    })
  );
}
const path = createGeometry(channels, render);
function interpolateNumber(t, start, stop) {
  return start * (1 - t) + stop * t;
}
function interpolateColor(t, d0, d1) {
  const [r0, g0, b0] = hexToRgb(d0);
  const [r1, g1, b1] = hexToRgb(d1);
  const r = interpolateNumber(t, r0, r1);
  const g = interpolateNumber(t, g0, g1);
  const b = interpolateNumber(t, b0, b1);
  return rgbToHex(parseInt(r), parseInt(g), parseInt(b));
}
function hexToRgb(hex) {
  const rgb = [];
  for (let i = 1; i < 7; i += 2) {
    rgb.push(parseInt(`0x${hex.slice(i, i + 2)}`));
  }
  return rgb;
}
function rgbToHex(r, g, b) {
  const hex = (r << 16 | g << 8 | b).toString(16);
  return `#${new Array(Math.abs(hex.length - 7)).join("0")}${hex}`;
}
function createLinear({
  domain: [d0, d1],
  range: [r0, r1],
  interpolate = interpolateNumber
}) {
  const scale2 = (x) => {
    const t = normalize(x, d0, d1);
    return interpolate(t, r0, r1);
  };
  scale2.ticks = (tickCount = 10) => ticks(d0, d1, tickCount);
  scale2.nice = (tickCount = 10) => {
    if (d0 === d1) return;
    const step = tickStep(d0, d1, tickCount);
    [d0, d1] = nice([d0, d1], {
      floor: (x) => floor(x, step),
      ceil: (x) => ceil(x, step)
    });
  };
  return scale2;
}
function createIdentity() {
  return (x) => x;
}
function createOrdinal({ domain, range }) {
  const key = JSON.stringify;
  const indexMap = new Map(domain.map((d, i) => [key(d), i]));
  return (x) => {
    const index = indexMap.get(key(x));
    return range[index % range.length];
  };
}
function createBand(options) {
  const { bandRange, bandWidth, step } = band(options);
  const scale2 = createOrdinal({ ...options, range: bandRange });
  scale2.bandWidth = () => bandWidth;
  scale2.step = () => step;
  return scale2;
}
function band({ domain, range, padding, margin = padding }) {
  const [r0, r1] = range;
  const n = domain.length;
  const step = (r1 - r0) / (margin * 2 + n - padding);
  const bandWidth = step * (1 - padding);
  const x = (_, i) => r0 + margin * step + step * i;
  return {
    step,
    bandWidth,
    bandRange: new Array(n).fill(0).map(x)
  };
}
function createPoint(options) {
  return createBand({ ...options, padding: 1 });
}
function createThreshold({ domain, range }) {
  const n = Math.min(domain.length, range.length - 1);
  const scale2 = (x) => {
    const index = bisect(domain, x);
    return range[index === -1 ? n : index];
  };
  scale2.thresholds = () => domain;
  return scale2;
}
function createQuantile({ domain, range, ...rest }) {
  const n = range.length - 1;
  const sortedDomain = domain.sort((a, b) => a - b);
  const step = (sortedDomain.length - 1) / (n + 1);
  const quantileDomain = new Array(n).fill(0).map((_, index) => {
    const i = (index + 1) * step;
    const i0 = Math.floor(i);
    const i1 = i0 + 1;
    const v0 = sortedDomain[i0];
    const v1 = sortedDomain[i1];
    return v0 * (i1 - i) + v1 * (i - i0);
  });
  return createThreshold({ domain: quantileDomain, range, ...rest });
}
function createQuantize({ domain: [d0, d1], range, ...rest }) {
  const n = range.length - 1;
  const step = (d1 - d0) / (n + 1);
  const quantizeDomain = new Array(n).fill(0).map((_, i) => step * (i + 1));
  return createThreshold({ domain: quantizeDomain, range, ...rest });
}
function createTime({ domain, ...rest }) {
  const transform2 = (x) => x.getTime();
  const transformedDomain = domain.map(transform2);
  const linear = createLinear({ domain: transformedDomain, ...rest });
  const scale2 = (x) => linear(transform2(x));
  scale2.nice = (tickCount) => linear.nice(tickCount);
  scale2.ticks = (tickCount) => linear.ticks(tickCount).map((d) => new Date(d));
  return scale2;
}
function createLog({ domain, base = Math.E, ...rest }) {
  const transform2 = (x) => Math.log(x);
  let linear = createLinear({ domain: domain.map(transform2), ...rest });
  const scale2 = (x) => linear(transform2(x));
  scale2.ticks = (tickCount = 5) => {
    const [min2, max2] = domain.map((x) => log(x, base));
    return ticks(min2, max2, tickCount).map((x) => base ** x);
  };
  scale2.nice = () => {
    domain = nice(domain, {
      floor: (x) => base ** Math.floor(log(x, base)),
      ceil: (x) => base ** Math.ceil(log(x, base))
    });
    linear = createLinear({ domain: domain.map(transform2), ...rest });
  };
  return scale2;
}
function createAxis(components2) {
  return (renderer, scale2, coordinate2, {
    domain,
    label,
    tickCount = 10,
    formatter = identity,
    tickLength = 5,
    grid = false,
    tick = true
  }) => {
    if (domain.length === 0) return;
    const fontSize = 10;
    const isOrdinal2 = !!scale2.bandWidth;
    const isQuantitative = !!scale2.ticks;
    const offset = isOrdinal2 ? scale2.bandWidth() / 2 : 0;
    const values = isQuantitative ? scale2.ticks(tickCount) : domain;
    const center = coordinate2.center();
    const type = `${+coordinate2.isPolar()}${+coordinate2.isTranspose()}`;
    const options = { tickLength, fontSize, center, isOrdinal: isOrdinal2 };
    const { grid: Grid, ticks: Ticks, label: Label, start, end } = components2[type];
    const ticks2 = values.map((d) => {
      const [x, y] = coordinate2(start(d, scale2, offset));
      const text2 = formatter(d);
      return { x, y, text: text2 };
    });
    const labelTick = (() => {
      if (!isOrdinal2) return lastOf(ticks2);
      const value = lastOf(values);
      const [x, y] = coordinate2(start(value, scale2, offset * 2));
      return { x, y };
    })();
    if (grid && Grid) Grid(renderer, ticks2, end(coordinate2));
    if (tick && Ticks) Ticks(renderer, ticks2, options);
    if (label && Label) Label(renderer, label, labelTick, options);
  };
}
function ticksBottom(renderer, ticks2, { tickLength, fontSize }) {
  for (const { x, y, text: text2 } of ticks2) {
    const x2 = x;
    const y2 = y + tickLength;
    renderer.line({ x1: x, y1: y, x2, y2, stroke: "currentColor", class: "tick" });
    renderer.text({ text: text2, fontSize, x, y: y2, textAnchor: "middle", dy: "1em", class: "text" });
  }
}
function ticksTop(renderer, ticks2, { tickLength, fontSize }) {
  for (const { x, y, text: text2 } of ticks2) {
    const x2 = x;
    const y2 = y - tickLength;
    renderer.line({ x1: x, y1: y, x2, y2, stroke: "currentColor", class: "tick" });
    renderer.text({ text: text2, fontSize, x, y: y2, textAnchor: "middle", dy: "-0.3em", class: "text" });
  }
}
function ticksLeft(renderer, ticks2, { tickLength, fontSize }) {
  for (const { x, y, text: text2 } of ticks2) {
    const x2 = x - tickLength;
    const y2 = y;
    renderer.line({ x1: x, y1: y, x2, y2, stroke: "currentColor", class: "tick" });
    renderer.text({
      text: text2,
      fontSize,
      x: x2,
      y,
      textAnchor: "end",
      dy: "0.5em",
      dx: "-0.5em",
      class: "text"
    });
  }
}
function ticksCircular(renderer, ticks2, { tickLength, fontSize, center }) {
  for (const { x, y, text: text2 } of unique(
    ticks2,
    (d) => d.x,
    (d) => d.y
  )) {
    const { tickRotation, textRotation } = rotationOf(center, [x, y]);
    const [x2, y2] = [0, tickLength];
    const dy = textRotation === 0 ? "1.2em" : "-0.5em";
    renderer.save();
    renderer.translate(x, y);
    renderer.rotate(degree(tickRotation));
    renderer.line({
      x1: 0,
      y1: 0,
      x2,
      y2,
      stroke: "currentColor",
      fill: "currentColor",
      class: "tick"
    });
    renderer.save();
    renderer.translate(x2, y2);
    renderer.rotate(degree(textRotation));
    renderer.text({
      text: `${text2}`,
      x: 0,
      y: 0,
      textAnchor: "middle",
      fontSize,
      fill: "currentColor",
      dy,
      class: "text"
    });
    renderer.restore();
    renderer.restore();
  }
}
function rotationOf(center, [x, y]) {
  const tickRotation = angle(sub([x, y], center));
  const textRotation = tickRotation < 0 ? Math.PI : 0;
  return { tickRotation: tickRotation - Math.PI / 2, textRotation };
}
function gridVertical(renderer, ticks2, end) {
  const [, y2] = end;
  for (const { x, y } of ticks2) {
    renderer.line({ x1: x, y1: y, x2: x, y2, stroke: "#eee", class: "grid" });
  }
}
function gridHorizontal(renderer, ticks2, end) {
  const [x2] = end;
  for (const { x, y } of ticks2) {
    renderer.line({ x1: x, y1: y, x2, y2: y, stroke: "#eee", class: "grid" });
  }
}
function gridRay(renderer, ticks2, end) {
  const [x2, y2] = end;
  for (const { x, y } of ticks2) {
    renderer.line({ x1: x, y1: y, x2, y2, stroke: "#eee", class: "grid" });
  }
}
function gridCircular(renderer, ticks2, end) {
  const [cx, cy] = end;
  for (const { x, y } of ticks2) {
    const r = dist(end, [x, y]);
    renderer.circle({ fill: "none", stroke: "#eee", cx, cy, r, class: "grid" });
  }
}
function labelLeftUp(renderer, label, { x, y }, { isOrdinal: isOrdinal2, ...options }) {
  const text2 = isOrdinal2 ? label : `↑ ${label}`;
  renderer.text({ ...common(options), text: text2, x, y, dy: "-1em" });
}
function labelLeftDown(renderer, label, { x, y }, { isOrdinal: isOrdinal2, ...options }) {
  const text2 = isOrdinal2 ? label : `↓ ${label}`;
  renderer.text({ ...common(options), text: text2, x, y, dy: "2.2em" });
}
function labelBottomRight(renderer, label, { x, y }, { isOrdinal: isOrdinal2, tickLength, ...options }) {
  const ty = y + tickLength;
  const text2 = isOrdinal2 ? label : `${label} →`;
  renderer.text({ ...common(options), text: text2, x, y: ty, dy: "2.2em" });
}
function labelTopRight(renderer, label, { x, y }, { isOrdinal: isOrdinal2, tickLength, ...options }) {
  const ty = y - tickLength;
  const text2 = isOrdinal2 ? label : `${label} →`;
  renderer.text({ ...common(options), text: text2, x, y: ty, dy: "-1.2em" });
}
function common({ fontSize }) {
  return { textAnchor: "end", class: "label", fontWeight: "bold", fontSize };
}
const components$1 = {
  "00": {
    start: (d, scale2, offset) => [scale2(d) + offset, 1],
    end: (coordinate2) => coordinate2([0, 0]),
    grid: gridVertical,
    ticks: ticksBottom,
    label: labelBottomRight
  },
  "01": {
    start: (d, scale2, offset) => [scale2(d) + offset, 1],
    end: (coordinate2) => coordinate2([0, 0]),
    grid: gridHorizontal,
    ticks: ticksLeft,
    label: labelLeftDown
  },
  10: {
    start: (d, scale2, offset) => [scale2(d) + offset, 0],
    grid: gridRay,
    ticks: ticksCircular,
    end: (coordinate2) => coordinate2.center()
  },
  11: {
    start: (d, scale2, offset) => [scale2(d) + offset, 1],
    grid: gridCircular,
    ticks: ticksLeft,
    end: (coordinate2) => coordinate2.center()
  }
};
const axisX = createAxis(components$1);
const components = {
  "00": {
    start: (d, scale2, offset) => [0, scale2(d) + offset],
    end: (coordinate2) => coordinate2([1, 0]),
    grid: gridHorizontal,
    ticks: ticksLeft,
    label: labelLeftUp
  },
  "01": {
    start: (d, scale2, offset) => [0, scale2(d) + offset],
    end: (coordinate2) => coordinate2([1, 0]),
    grid: gridVertical,
    ticks: ticksTop,
    label: labelTopRight
  },
  10: {
    start: (d, scale2, offset) => [0, scale2(d) + offset],
    grid: gridCircular,
    ticks: ticksLeft,
    end: (coordinate2) => coordinate2.center()
  },
  11: {
    start: (d, scale2, offset) => [0, scale2(d) + offset],
    grid: gridRay,
    ticks: ticksCircular,
    end: (coordinate2) => coordinate2.center()
  }
};
const axisY = createAxis(components);
function legendSwatches(renderer, scale2, coordinate2, {
  x,
  y,
  width = 64,
  marginLeft = 6,
  swatchSize = 10,
  fontSize = 10,
  formatter = identity,
  domain,
  label
}) {
  renderer.save();
  renderer.translate(x, y);
  if (label) {
    renderer.text({
      text: label,
      x: 0,
      y: 0,
      fontWeight: "bold",
      fontSize,
      textAnchor: "start",
      dy: "1em"
    });
  }
  const legendY = label ? swatchSize * 2 : 0;
  for (const [i, t] of Object.entries(domain)) {
    const color2 = scale2(t);
    const legendX = width * i;
    renderer.rect({
      x: legendX,
      y: legendY,
      width: swatchSize,
      height: swatchSize,
      stroke: color2,
      fill: color2
    });
    const textX = legendX + marginLeft + swatchSize;
    const textY = legendY + swatchSize;
    renderer.text({ text: formatter(t), x: textX, y: textY, fill: "currentColor", fontSize });
  }
  renderer.restore();
}
function legendRamp(renderer, scale2, coordinate2, {
  x,
  y,
  width = 120,
  height = 10,
  domain,
  tickCount = 5,
  tickLength = height + 5,
  formatter = identity,
  fontSize = 10,
  label
}) {
  renderer.save();
  renderer.translate(x, y);
  if (label) {
    renderer.text({
      text: label,
      x: 0,
      y: 0,
      fontWeight: "bold",
      fontSize,
      textAnchor: "start",
      dy: "1em"
    });
  }
  const legendY = label ? height * 2 : 0;
  const domainValues = [firstOf(domain), lastOf(domain)];
  const value = createLinear({ domain: [0, width], range: domainValues });
  for (let i = 0; i < width; i += 1) {
    const stroke = scale2(value(i));
    renderer.line({ x1: i, y1: legendY, x2: i, y2: legendY + height, stroke });
  }
  const position = createLinear({ domain: domainValues, range: [0, width] });
  const values = scale2.thresholds ? [domainValues[0], ...scale2.thresholds(), domainValues[1]] : position.ticks(tickCount);
  const ticks2 = values.map((d) => ({
    x: position(d),
    y: legendY,
    text: formatter(d)
  }));
  ticksBottom(renderer, ticks2, { fontSize, tickLength });
  renderer.restore();
}
function createStackY() {
  return ({ index, values }) => {
    const { y: Y, x: X } = values;
    const series = X ? Array.from(group(index, (i) => X[i]).values()) : [index];
    const newY = new Array(index.length);
    const newY1 = new Array(index.length);
    for (const I of series) {
      for (let py = 0, i = 0; i < I.length; py = newY[I[i]], i += 1) {
        const index2 = I[i];
        newY1[index2] = py;
        newY[index2] = py + Y[index2];
      }
    }
    return {
      index,
      values: { ...values, y: newY, y1: newY1 }
    };
  };
}
function createSymmetryY() {
  return ({ index, values }) => {
    const { x: X } = values;
    const series = X ? Array.from(group(index, (i) => X[i]).values()) : [index];
    const newValues = Object.fromEntries(
      ["y1", "y"].filter((key) => values[key]).map((key) => [key, new Array(index.length)])
    );
    const M = new Array(series.length);
    for (const [i, I] of Object.entries(series)) {
      const Y = I.flatMap((i2) => Object.keys(newValues).map((key) => values[key][i2]));
      const min2 = Math.min(...Y);
      const max2 = Math.max(...Y);
      M[i] = (min2 + max2) / 2;
    }
    const maxM = Math.max(...M);
    for (const [i, I] of Object.entries(series)) {
      const offset = maxM - M[i];
      for (const i2 of I) {
        for (const key of Object.keys(newValues)) {
          newValues[key][i2] = values[key][i2] + offset;
        }
      }
    }
    return {
      index,
      values: {
        ...values,
        ...newValues
      }
    };
  };
}
function createNormalizeY() {
  return ({ index, values }) => {
    const { x: X } = values;
    const series = X ? Array.from(group(index, (i) => X[i]).values()) : [index];
    const newValues = Object.fromEntries(
      ["y1", "y"].filter((key) => values[key]).map((key) => [key, new Array(index.length)])
    );
    for (const I of series) {
      const Y = I.flatMap((i) => Object.keys(newValues).map((key) => values[key][i]));
      const n = Math.max(...Y);
      for (const i of I) {
        for (const key of Object.keys(newValues)) {
          newValues[key][i] = values[key][i] / n;
        }
      }
    }
    return {
      index,
      values: {
        ...values,
        ...newValues
      }
    };
  };
}
function bin(values, count = 10, accessor = identity) {
  const minValue = min(values, accessor);
  const maxValue = max(values, accessor);
  const step = tickStep(minValue, maxValue, count);
  const niceMin = floor(minValue, step);
  const niceMax = ceil(maxValue, step);
  const niceStep = tickStep(niceMin, niceMax, count);
  const thresholds = ticks(niceMin, niceMax, count);
  return Array.from(/* @__PURE__ */ new Set([floor(niceMin, niceStep), ...thresholds, ceil(niceMax, niceStep)]));
}
function createBinX({ count = 10, channel, aggregate = (values) => values.length } = {}) {
  return ({ index, values }) => {
    const { [channel]: C, x: X, x1, ...rest } = values;
    const keys = Object.keys(rest);
    const thresholds = bin(X, count);
    const n = thresholds.length;
    const groups = group(index, (i) => bisect(thresholds, X[i]) - 1);
    const I = new Array(n - 1).fill(0).map((_, i) => i);
    const filtered = I.filter((i) => groups.has(i));
    return {
      index: filtered,
      values: Object.fromEntries([
        ...keys.map((key) => [
          key,
          I.map((i) => {
            if (!groups.has(i)) return void 0;
            return values[key][firstOf(groups.get(i))];
          })
        ]),
        [
          channel,
          I.map((i) => {
            if (!groups.has(i)) return 0;
            return aggregate(groups.get(i).map((index2) => values[index2]));
          })
        ],
        ["x", thresholds.slice(0, n - 1)],
        ["x1", thresholds.slice(1, n)]
      ])
    };
  };
}
function create(options) {
  if (typeof options === "function") return options;
  const { type, ...rest } = options;
  if (type === "interval") return interval;
  if (type === "line") return line;
  if (type === "area") return area;
  if (type === "text") return text;
  if (type === "link") return link;
  if (type === "cell") return cell;
  if (type === "rect") return rect;
  if (type === "point") return point;
  if (type === "path") return path;
  if (type === "facet") {
    const facet = () => {
    };
    facet.channels = () => ({
      x: { name: "x", optional: true },
      y: { name: "y", optional: true }
    });
    return facet;
  }
  if (type === "stackY") return createStackY();
  if (type === "normalizeY") return createNormalizeY();
  if (type === "symmetryY") return createSymmetryY();
  if (type === "binX") return createBinX(rest);
  if (type === "cartesian") return cartesian(rest);
  if (type === "transpose") return transpose(rest);
  if (type === "polar") return polar(rest);
  if (type === "band") return createBand(rest);
  if (type === "linear") return createScaleQ(createLinear, rest);
  if (type === "time") return createScaleQ(createTime, rest);
  if (type === "log") return createScaleQ(createLog, rest);
  if (type === "identity") return createIdentity();
  if (type === "ordinal") return createOrdinal(rest);
  if (type === "dot") return createPoint(rest);
  if (type === "quantile") return createQuantile(rest);
  if (type === "quantize") return createQuantize(rest);
  if (type === "threshold") return createThreshold(rest);
  if (type === "axisX") return createGuide(axisX, rest);
  if (type === "axisY") return createGuide(axisY, rest);
  if (type === "legendSwatches") return createGuide(legendSwatches, rest);
  if (type === "legendRamp") return createGuide(legendRamp, rest);
  throw new Error(`any node type: ${options.type}`);
}
function createGuide(guide, options) {
  return (renderer, scale2, coordinate2) => guide(renderer, scale2, coordinate2, options);
}
function createScaleQ(ctor, options) {
  const { nice: nice2 = true, tickCount = 10 } = options;
  const scale2 = ctor(options);
  if (nice2) scale2.nice(tickCount);
  return scale2;
}
const categoricalColors = [
  "#5B8FF9",
  "#5AD8A6",
  "#5D7092",
  "#F6BD16",
  "#6F5EF9",
  "#6DC8EC",
  "#945FB9",
  "#FF9845",
  "#1E9493",
  "#FF99C3"
];
const ordinalColors = ["#9DF5CA", "#61DDAA", "#42C090", "#19A576", "#008A5D"];
function inferScales(channels2, options) {
  const scaleChannels = group(channels2.flatMap(Object.entries), ([name]) => scaleName(name));
  const scales = {};
  for (const [name, channels22] of scaleChannels) {
    const channel = mergeChannels(name, channels22);
    const o = options[name] || {};
    const type = inferScaleType(channel, o);
    scales[name] = {
      ...o,
      ...inferScaleOptions(type, channel, o),
      domain: inferScaleDomain(type, channel, o),
      range: inferScaleRange(type, channel, o),
      label: inferScaleLabel(type, channel, o),
      type
    };
  }
  return scales;
}
function applyScales(channels2, scales) {
  return map(channels2, ({ values, name }) => {
    const scale2 = scales[scaleName(name)];
    return values.map(scale2);
  });
}
function scaleName(name) {
  if (name.startsWith("x")) return "x";
  if (name.startsWith("y")) return "y";
  if (isColor(name)) return "color";
  return name;
}
function mergeChannels(name, channels2) {
  const values = [];
  let scale2;
  let field;
  for (const [, { values: v = [], scale: s, field: f }] of channels2) {
    values.push(...v);
    if (!scale2 && s) scale2 = s;
    if (!field && f) field = f;
  }
  return { name, scale: scale2, values, field };
}
function inferScaleType({ name, scale: scale2, values }, { type, domain, range }) {
  if (scale2) return scale2;
  if (type) return type;
  if ((domain || range || []).length > 2) return asOrdinalType(name);
  if (domain !== void 0) {
    if (isOrdinal(domain)) return asOrdinalType(name);
    if (isTemporal(domain)) return "time";
    return "linear";
  }
  if (isOrdinal(values)) return asOrdinalType(name);
  if (isTemporal(values)) return "time";
  if (isUnique(values)) return "identity";
  return "linear";
}
function inferScaleDomain(type, { values }, { domain, ...options }) {
  if (domain) return domain;
  switch (type) {
    case "linear":
    case "log":
    case "quantize":
      return inferDomainQ(values, options);
    case "ordinal":
    case "dot":
    case "band":
      return inferDomainC(values);
    case "quantile":
      return inferDomainO(values);
    case "time":
      return inferDomainT(values, options);
    default:
      return [];
  }
}
function inferScaleRange(type, { name }, { range }) {
  if (range) return range;
  switch (type) {
    case "linear":
    case "log":
    case "time":
    case "band":
    case "dot":
      return inferRangeQ(name);
    case "ordinal":
      return categoricalColors;
    case "quantile":
    case "quantize":
    case "threshold":
      return ordinalColors;
    default:
      return [];
  }
}
function inferScaleOptions(type, { name }, { padding, interpolate, margin }) {
  switch (type) {
    case "linear":
    case "log":
      if (interpolate) return { interpolate };
      return { interpolate: name === "color" ? interpolateColor : interpolateNumber };
    case "band":
      return { padding: padding !== void 0 ? padding : 0.1 };
    case "dot":
      return { margin: margin !== void 0 ? margin : 0.5 };
    default:
      return {};
  }
}
function inferScaleLabel(type, { field }, { label }) {
  if (label !== void 0) return label;
  return field;
}
function asOrdinalType(name) {
  if (isPosition(name)) return "dot";
  return "ordinal";
}
function isPosition(name) {
  return name === "x" || name === "y";
}
function isColor(name) {
  return name === "fill" || name === "stroke";
}
function isOrdinal(values) {
  return values.some((v) => {
    const type = typeof v;
    return type === "string" || type === "boolean";
  });
}
function isTemporal(values) {
  return values.some((v) => v instanceof Date);
}
function isUnique(values) {
  return Array.from(new Set(values)).length === 1;
}
function inferDomainQ(values, { zero: zero2 = false } = {}) {
  const definedValues = values.filter(defined);
  if (definedValues.length === 0) return [];
  const min2 = Math.min(...definedValues);
  const max2 = Math.max(...definedValues);
  return [zero2 ? 0 : min2, max2];
}
function inferDomainC(values) {
  return Array.from(new Set(values.filter(defined)));
}
function inferDomainO(values, domain) {
  return inferDomainC(values).sort();
}
function inferDomainT(values, domain) {
  return inferDomainQ(values, domain).map((d) => new Date(d));
}
function inferRangeQ(name) {
  if (name === "y") return [1, 0];
  if (name === "color") return [firstOf(ordinalColors), lastOf(ordinalColors)];
  return [0, 1];
}
function inferEncodings(type, data, encodings) {
  const typedEncodings = map(encodings, (encoding, key) => ({
    type: inferType(data, encoding, key),
    value: encoding
  }));
  switch (type) {
    case "interval":
      return maybeFill(maybeZeroX(maybeZeroY1(typedEncodings)));
    case "line":
      return maybeStroke(maybeGroup(typedEncodings));
    case "area":
      return maybeFill(maybeIdentityX(maybeZeroY1(maybeGroup(typedEncodings))));
    case "link":
      return maybeStroke(maybeIdentityX(typedEncodings));
    case "point":
      return maybeZeroY(maybeStroke(typedEncodings));
    case "rect":
      return maybeFill(maybeZeroX1(maybeZeroY1(typedEncodings)));
    case "cell":
      return maybeFill(typedEncodings);
  }
  return typedEncodings;
}
function valueOf(data, { type, value }) {
  if (type === "transform") return data.map(value);
  if (type === "value") return data.map(() => value);
  return data.map((d) => d[value]);
}
function inferType(data, encoding, name) {
  if (typeof encoding === "function") return "transform";
  if (typeof encoding === "string") {
    if (data.length && firstOf(data)[encoding] !== void 0) return "field";
    if (isStyle(name)) return "constant";
  }
  return "value";
}
function isStyle(type) {
  return type === "fill" || type === "stroke";
}
function maybeFill({ fill = color(), ...rest }) {
  return { fill, ...rest };
}
function maybeStroke({ stroke = color(), ...rest }) {
  return { stroke, ...rest };
}
function maybeZeroY1({ y1 = zero(), ...rest }) {
  return { y1, ...rest };
}
function maybeZeroX1({ x1 = zero(), ...rest }) {
  return { x1, ...rest };
}
function maybeZeroY({ y = zero(), ...rest }) {
  return { y, ...rest };
}
function maybeZeroX({ x = zero(), ...rest }) {
  return { x, ...rest };
}
function maybeIdentityX({ x, x1 = x, ...rest }) {
  return { x, x1, ...rest };
}
function maybeGroup({ fill, stroke, z, ...rest }) {
  if (z === void 0) z = maybeField(fill);
  if (z === void 0) z = maybeField(stroke);
  return { fill, stroke, z, ...rest };
}
function maybeField(encoding) {
  if (encoding === void 0 || encoding.type !== "field") return void 0;
  return encoding;
}
function zero() {
  return { type: "value", value: 0 };
}
function color() {
  return { type: "constant", value: categoricalColors[0] };
}
function initialize({
  data,
  type,
  encodings: E = {},
  statistics: statisticsOptions = [],
  transforms: transformsOptions = [],
  styles
}) {
  const transform2 = compose(...transformsOptions.map(create));
  const transformedData = transform2(data);
  const index = indexOf(transformedData);
  const encodings = inferEncodings(type, transformedData, E);
  const constants = {};
  const values = {};
  for (const [key, e] of Object.entries(encodings)) {
    if (e) {
      const { type: type2, value } = e;
      if (type2 === "constant") constants[key] = value;
      else values[key] = valueOf(transformedData, e);
    }
  }
  const statistic = compose(...statisticsOptions.map(create));
  const { values: transformedValues, index: I } = statistic({ index, values });
  const geometry = create({ type });
  const channels2 = {};
  for (const [key, channel] of Object.entries(geometry.channels())) {
    const values2 = transformedValues[key];
    const { optional } = channel;
    if (values2) {
      channels2[key] = createChannel(channel, values2, encodings[key]);
    } else if (!optional) {
      throw new Error(`Missing values for channel: ${key}`);
    }
  }
  return { index: I, geometry, channels: channels2, styles: { ...styles, ...constants } };
}
function createChannel(channel, values, encoding = {}) {
  const { type, value } = encoding;
  return {
    ...channel,
    ...type === "field" && { field: value },
    values
  };
}
function inferGuides(scales, dimensions, options) {
  const { x: xScale, y: yScale, color: colorScale } = scales;
  const { x = {}, y = {}, color: color2 = {} } = options;
  const { display: dx = true } = x;
  const { display: dy = true } = y;
  const { display: dc = true } = color2;
  return {
    ...dx && xScale && { x: { ...merge(x, xScale), type: "axisX" } },
    ...dy && yScale && { y: { ...merge(y, yScale), type: "axisY" } },
    ...dc && colorScale && {
      color: {
        ...merge(color2, colorScale),
        ...inferPosition(dimensions),
        type: inferLegendType(colorScale)
      }
    }
  };
}
function merge(options, { domain, label }) {
  return { ...options, domain, label };
}
function inferLegendType({ type }) {
  switch (type) {
    case "linear":
    case "log":
    case "time":
    case "threshold":
    case "quantile":
    case "quantize":
      return "legendRamp";
    default:
      return "legendSwatches";
  }
}
function inferPosition({ x, y, paddingLeft }) {
  return { x: x + paddingLeft, y };
}
function plot(root) {
  const { width = 640, height = 480, renderer: plugin } = root;
  const renderer = createRenderer(width, height, plugin);
  flow(root);
  const views = createViews(root);
  for (const [view, nodes] of views) {
    const { transform: transform2 = identity, ...dimensions } = view;
    const geometries = [];
    const scales = {};
    const guides = {};
    let coordinates = [];
    const chartNodes = nodes.filter(({ type }) => isChartNode(type));
    for (const options of chartNodes) {
      const {
        scales: s = {},
        guides: g = {},
        coordinates: c = [],
        transforms = [],
        paddingLeft,
        paddingRight,
        paddingBottom,
        paddingTop,
        ...geometry
      } = options;
      assignDefined(scales, s);
      assignDefined(guides, g);
      assignDefined(dimensions, { paddingLeft, paddingRight, paddingBottom, paddingTop });
      if (c) coordinates = c;
      geometries.push({ ...geometry, transforms: [transform2, ...transforms] });
    }
    plotView({ renderer, scales, guides, geometries, coordinates, ...dimensions });
  }
  return renderer.node();
}
function plotView({
  renderer,
  scales: scalesOptions,
  guides: guidesOptions,
  coordinates: coordinateOptions,
  geometries: geometriesOptions,
  width,
  height,
  x,
  y,
  paddingLeft = 45,
  paddingRight = 45,
  paddingBottom = 45,
  paddingTop = 65
}) {
  const geometries = geometriesOptions.map(initialize);
  const channels2 = geometries.map((d) => d.channels);
  const scaleDescriptors = inferScales(channels2, scalesOptions);
  const guidesDescriptors = inferGuides(scaleDescriptors, { x, y, paddingLeft }, guidesOptions);
  const scales = map(scaleDescriptors, create);
  const guides = map(guidesDescriptors, create);
  const transforms = inferCoordinates(coordinateOptions).map(create);
  const coordinate2 = createCoordinate({
    x: x + paddingLeft,
    y: y + paddingTop,
    width: width - paddingLeft - paddingRight,
    height: height - paddingTop - paddingBottom,
    transforms
  });
  for (const [key, guide] of Object.entries(guides)) {
    const scale2 = scales[key];
    guide(renderer, scale2, coordinate2);
  }
  for (const { index, geometry, channels: channels22, styles } of geometries) {
    const values = applyScales(channels22, scales);
    geometry(renderer, index, scales, values, styles, coordinate2);
  }
}
function isChartNode(type) {
  switch (type) {
    case "layer":
    case "col":
    case "row":
      return false;
    default:
      return true;
  }
}
function flow(root) {
  bfs(root, ({ type, children, ...options }) => {
    if (isChartNode(type)) return;
    if (!children || children.length === 0) return;
    const keyDescriptors = [
      "o:encodings",
      "o:scales",
      "o:guides",
      "o:styles",
      "a:coordinates",
      "a:statistics",
      "a:transforms",
      "a:data"
    ];
    for (const child of children) {
      for (const descriptor of keyDescriptors) {
        const [type2, key] = descriptor.split(":");
        if (type2 === "o") {
          child[key] = { ...options[key], ...child[key] };
        } else {
          child[key] = child[key] || options[key];
        }
      }
    }
  });
}
function inferCoordinates(coordinates) {
  return [...coordinates, { type: "cartesian" }];
}
export {
  plot
};
