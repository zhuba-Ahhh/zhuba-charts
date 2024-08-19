export const transpose = () => {
  return transform('transpose', ([px, py]) => [py, px]);
};

export const translate = (tx = 0, ty = 0) => {
  return transform('translate', ([px, py]) => [px + tx, py + ty]);
};

export const scale = (sx = 1, sy = 1) => {
  return transform('scale', ([px, py]) => [px * sx, py * sy]);
};

export const reflect = () => {
  return transform('reflect', scale(-1, -1));
};

export const reflectX = () => {
  return transform('reflectX', scale(-1, 1));
};

export const reflectY = () => {
  return transform('reflectY', scale(1, -1));
};

export const polar = () => {
  return transform('polar', ([theta, radius]) => {
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    return [x, y];
  });
};

const transform = (
  type: string,
  transformer: {
    ([px, py]: [any, any]): any[];
    ([px, py]: [any, any]): any[];
    ([px, py]: [any, any]): number[];
    ([theta, radius]: [any, any]): number[];
    type?: any;
  }
) => {
  transformer.type = () => type;
  return transformer;
};
