export declare function computeFacetViews(box: any, { data, encodings, padding, paddingLeft, paddingRight, paddingBottom, paddingTop, }: {
    data: any;
    encodings?: {} | undefined;
    padding?: number | undefined;
    paddingLeft?: number | undefined;
    paddingRight?: number | undefined;
    paddingBottom?: number | undefined;
    paddingTop?: number | undefined;
}): {
    x: any;
    y: any;
    width: number;
    height: number;
    transform: (data: any) => any;
}[];
