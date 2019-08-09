import { Candidate } from './candidate';
import { SpatialReference } from './spatial-reference';

export interface LocationFound {
    spatialReference: SpatialReference;
    candidates: Candidate[];
}


