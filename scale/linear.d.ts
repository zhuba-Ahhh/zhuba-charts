import { interpolateNumber } from './interpolate';

export declare function createLinear({ domain: [d0, d1], range: [r0, r1], interpolate }: {
    domain: [any, any];
    range: [any, any];
    interpolate?: typeof interpolateNumber | undefined;
}): {
    (x: any): number;
    ticks(tickCount?: number): any[];
    nice(tickCount?: number): void;
};
