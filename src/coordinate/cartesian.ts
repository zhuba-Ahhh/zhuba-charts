import { curry } from '../utils';
import { scale, translate } from './transform';

const coordinate = (
  transformOptions: any,
  canvasOptions: { x: any; y: any; width: any; height: any }
) => {
  const { x, y, width, height } = canvasOptions;
  return [scale(width, height), translate(x, y)];
};

export const cartesian = curry(coordinate);
