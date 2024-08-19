import { identity } from './helper';

export declare function group(array: any, key?: (d: any) => any): Map<any, any>;
export declare function tickStep(min: any, max: any, count: any): number;
export declare function ticks(min: any, max: any, count: any): any[];
export declare function bisect(array: any, x: any, lo?: number, hi?: any, accessor?: typeof identity): number;
export declare function lastOf(array: any): any;
export declare function firstOf(array: any): any;
export declare function indexOf(array: any): any;
export declare function min(array: any, accessor: any): number;
export declare function max(array: any, accessor: any): number;
export declare function mean(array: any, accessor?: typeof identity): number;
export declare function median(array: any, accessor?: typeof identity): number;
export declare function count(array: any, accessor?: typeof identity): any;
export declare function sum(array: any, accessor?: typeof identity): any;
