export declare function ring(renderer: {
    path: (arg0: {
        d: any[][];
        stroke: string;
    }) => any;
    circle: (arg0: {
        fill: string;
        r: any;
        cx: any;
        cy: any;
    }) => any;
}, { cx, cy, r1, r2, ...styles }: {
    cx: any;
    cy: any;
    r1: number;
    r2: number;
}): any[];
export declare function contour(renderer: {
    path: (arg0: {
        stroke?: string;
        d: any[][];
        fill?: string;
    }) => any;
}, { points, ...styles }: {
    points: any[];
}): any[];
