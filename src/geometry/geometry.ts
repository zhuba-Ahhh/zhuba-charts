export function createGeometry(
  channels: { [s: string]: any } | ArrayLike<any>,
  render: {
    (renderer: any, I: any, scales: any, values: any, directStyles: any, coordinate: any): any[];
    (
      renderer: any,
      I: Iterable<any> | ArrayLike<any>,
      scales: { x: any; y: any },
      values: { x: any; y: any },
      directStyles: { [x: string]: any; x1: any; y1: any; x2: any; y2: any },
      coordinate: any
    ): any[];
    (renderer: any, I: any, scales: any, values: any, directStyles: any, coordinate: any): any[];
    (renderer: any, I: any, scales: any, values: any, directStyles: any, coordinate: any): any[];
    (renderer: any, I: any, scales: any, values: any, directStyles: any, coordinate: any): any[];
    (renderer: any, I: any, scales: any, values: any, directStyles: any, coordinate: any): any[];
    (renderer: any, I: any, scales: any, values: any, directStyles: any, coordinate: any): any[];
    (renderer: any, I: any, scales: any, values: any, directStyles: any, coordinate: any): any[];
    (renderer: any, I: any, scales: any, values: any, directStyles: any, coordinate: any): any[];
    (): void;
    (): void;
    (arg0: any, arg1: any, arg2: any, arg3: any, arg4: any, arg5: any): any;
  }
) {
  const geometry = (
    renderer: any,
    I: any,
    scales: { [x: string]: { bandWidth: any } },
    values: { [x: string]: any },
    styles: any,
    coordinate: any
  ) => {
    for (const [key, { optional, scale }] of Object.entries(channels)) {
      if (!optional) {
        if (!values[key]) throw new Error(`Missing Channel: ${key}`);
        if (scale === 'band' && (!scales[key] || !scales[key].bandWidth)) {
          throw new Error(`${key} channel needs band scale.`);
        }
      }
    }
    return render(renderer, I, scales, values, styles, coordinate);
  };

  geometry.channels = () => channels;

  return geometry;
}
