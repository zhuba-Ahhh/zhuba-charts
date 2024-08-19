export declare function createChannel({ name, optional, ...rest }: {
    [x: string]: any;
    name: any;
    optional?: boolean | undefined;
}): {
    name: any;
    optional: boolean;
};
export declare function createChannels(options?: {}): {
    x: {
        name: any;
        optional: boolean;
    };
    y: {
        name: any;
        optional: boolean;
    };
    stroke: {
        name: any;
        optional: boolean;
    };
    fill: {
        name: any;
        optional: boolean;
    };
};
