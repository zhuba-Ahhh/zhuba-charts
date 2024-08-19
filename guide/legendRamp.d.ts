import { identity } from '../utils';

export declare function legendRamp(renderer: any, scale: any, coordinate: any, { x, y, width, height, domain, tickCount, tickLength, formatter, fontSize, label, }: {
    x: any;
    y: any;
    width?: number | undefined;
    height?: number | undefined;
    domain: any;
    tickCount?: number | undefined;
    tickLength?: any;
    formatter?: typeof identity | undefined;
    fontSize?: number | undefined;
    label: any;
}): void;
