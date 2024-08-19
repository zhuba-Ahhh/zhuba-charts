export declare function createBinX({ count, channel, aggregate }?: {
    count?: number | undefined;
    channel: any;
    aggregate?: ((values: any) => any) | undefined;
}): ({ index, values }: {
    index: any;
    values: any;
}) => {
    index: number[];
    values: any;
};
