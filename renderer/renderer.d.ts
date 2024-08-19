import { line, circle, text, rect, path } from './shape';

export declare function createRenderer(width: any, height: any, { line: drawLine, circle: drawCircle, text: drawText, rect: drawRect, path: drawPath, context: intensifyContext, }?: {
    line?: typeof line | undefined;
    circle?: typeof circle | undefined;
    text?: typeof text | undefined;
    rect?: typeof rect | undefined;
    path?: typeof path | undefined;
    context?: ((d: any) => any) | undefined;
}): {
    line: (attributes: any) => any;
    circle: (attributes: any) => any;
    text: (attributes: any) => any;
    rect: (attributes: any) => any;
    path: (attributes: any) => any;
    restore: () => void;
    save: () => void;
    scale: (...args: any[]) => void;
    rotate: (...args: any[]) => void;
    translate: (...args: any[]) => void;
    node: () => any;
    group: () => any;
};
