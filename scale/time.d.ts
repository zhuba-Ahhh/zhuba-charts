export declare function createTime({ domain, ...rest }: {
    [x: string]: any;
    domain: any;
}): {
    (x: any): number;
    nice(tickCount: any): void;
    ticks(tickCount: any): Date[];
};
