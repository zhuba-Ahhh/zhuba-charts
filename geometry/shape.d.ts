export declare function rect(renderer: {
    rect?: any;
    path: any;
    circle?: (arg0: {
        fill: string;
        r: any;
        cx: any;
        cy: any;
    }) => any;
}, coordinate: {
    (value: any[], index: number, array: any[][]): any;
    isTranspose?: any;
    isPolar?: any;
    center?: any;
}, { x1, y1, x2, y2, ...styles }: {
    x1: any;
    y1: any;
    x2: any;
    y2: any;
    fill: any;
    stroke: any;
}): any;
export declare function circle(renderer: {
    circle: (arg0: {
        cx: any;
        cy: any;
        r: any;
    }) => any;
}, coordinate: (arg0: any[]) => [any, any], { cx, cy, r, ...styles }: {
    cx: any;
    cy: any;
    r: any;
    fill: any;
    stroke: any;
}): any;
export declare function line(renderer: {
    path: (arg0: {
        d: any[][];
    }) => any;
}, coordinate: {
    (arg0: any[]): any;
    (arg0: any[]): any;
    isPolar: any;
}, { X, Y, I: I0, ...styles }: {
    X: any;
    Y: any;
    I: any;
    fill: string;
    stroke: any;
}): any;
export declare function area(renderer: {
    path: any;
}, coordinate: {
    (value: any, index: number, array: any[]): any;
    isPolar?: any;
}, { X1, Y1, X2, Y2, I: I0, ...styles }: any): any;
export declare function text(renderer: {
    save: () => void;
    translate: (arg0: any, arg1: any) => void;
    rotate: (arg0: any) => void;
    text: (arg0: {
        text: any;
        x: number;
        y: number;
    }) => any;
    restore: () => void;
}, coordinate: (arg0: any[]) => [any, any], { x, y, rotate, text, ...styles }: any): any;
export declare function link(renderer: {
    line: (arg0: {
        x1: any;
        y1: any;
        x2: any;
        y2: any;
    }) => any;
}, coordinate: (value: any[], index: number, array: any[][]) => any, { x1, y1, x2, y2, ...styles }: {
    x1: any;
    y1: any;
    x2: any;
    y2: any;
    fill: any;
    stroke: any;
}): any;
export declare function path(renderer: {
    path: (arg0: any) => any;
}, coordinate: any, attributes: any): any;
