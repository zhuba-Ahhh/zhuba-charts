import { identity } from '../utils';

export declare function legendSwatches(renderer: any, scale: any, coordinate: any, { x, y, width, marginLeft, swatchSize, fontSize, formatter, domain, label, }: {
    x: any;
    y: any;
    width?: number | undefined;
    marginLeft?: number | undefined;
    swatchSize?: number | undefined;
    fontSize?: number | undefined;
    formatter?: typeof identity | undefined;
    domain: any;
    label: any;
}): void;
