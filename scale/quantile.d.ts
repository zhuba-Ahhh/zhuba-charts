export declare function createQuantile({ domain, range, ...rest }: {
    [x: string]: any;
    domain: any;
    range: any;
}): {
    (x: any): any;
    thresholds(): any;
};
