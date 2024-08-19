export declare function createQuantize({ domain: [d0, d1], range, ...rest }: {
    [x: string]: any;
    domain: [any, any];
    range: any;
}): {
    (x: any): any;
    thresholds(): any;
};
