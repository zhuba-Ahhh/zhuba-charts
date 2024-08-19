export declare function createLog({ domain, base, ...rest }: {
    [x: string]: any;
    domain: any;
    base?: number | undefined;
}): {
    (x: any): number;
    ticks(tickCount?: number): number[];
    nice(): void;
};
