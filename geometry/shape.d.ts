export declare function rect(renderer: any, coordinate: any, { x1, y1, x2, y2, ...styles }: {
    [x: string]: any;
    x1: any;
    y1: any;
    x2: any;
    y2: any;
}): any;
export declare function circle(renderer: any, coordinate: any, { cx, cy, r, ...styles }: {
    [x: string]: any;
    cx: any;
    cy: any;
    r: any;
}): any;
export declare function line(renderer: any, coordinate: any, { X, Y, I: I0, ...styles }: {
    [x: string]: any;
    X: any;
    Y: any;
    I: any;
}): any;
export declare function area(renderer: any, coordinate: any, { X1, Y1, X2, Y2, I: I0, ...styles }: {
    [x: string]: any;
    X1: any;
    Y1: any;
    X2: any;
    Y2: any;
    I: any;
}): any;
export declare function text(renderer: any, coordinate: any, { x, y, rotate, text, ...styles }: {
    [x: string]: any;
    x: any;
    y: any;
    rotate: any;
    text: any;
}): any;
export declare function link(renderer: any, coordinate: any, { x1, y1, x2, y2, ...styles }: {
    [x: string]: any;
    x1: any;
    y1: any;
    x2: any;
    y2: any;
}): any;
export declare function path(renderer: any, coordinate: any, attributes: any): any;
