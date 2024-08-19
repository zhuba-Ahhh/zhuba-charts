export declare function equal([x0, y0]: [any, any], [x1, y1]: [any, any]): boolean;
export declare function closeTo(x: any, y: any, tol?: number): boolean;
export declare function dist([x0, y0]: [any, any], [x1, y1]?: [(number | undefined)?, (number | undefined)?]): number;
export declare function sub([x1, y1]: [any, any], [x0, y0]: [any, any]): number[];
export declare function angleBetween(v0: any, v1: any): number;
export declare function angle([x, y]: [any, any]): number;
export declare function degree(radian: any): number;
export declare function unique(points: any, x?: (d: any) => any, y?: (d: any) => any): any;
