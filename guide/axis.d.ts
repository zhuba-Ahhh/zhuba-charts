import { identity } from '../utils';

export declare function createAxis(components: any): (renderer: any, scale: any, coordinate: any, { domain, label, tickCount, formatter, tickLength, grid, tick, }: {
    domain: any;
    label: any;
    tickCount?: number | undefined;
    formatter?: typeof identity | undefined;
    tickLength?: number | undefined;
    grid?: boolean | undefined;
    tick?: boolean | undefined;
}) => void;
