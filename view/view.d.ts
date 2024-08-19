import { computeFlexViews } from './flex';
import { computeFacetViews } from './facet';
import { computeLayerViews } from './layer';

export declare function createViews(root: any, computes?: {
    layer: typeof computeLayerViews;
    col: typeof computeFlexViews;
    row: typeof computeFlexViews;
    facet: typeof computeFacetViews;
}): any[][];
