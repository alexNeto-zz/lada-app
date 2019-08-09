
export interface Candidate {
    address: string;
    location: Location;
    score: number;
    attributes: Attributes;
    extent: Extent;
}

interface Location {
    x: number;
    y: number;
}

interface Attributes {
    City: string;
    Region: string;
    Country: string;
}

interface Extent {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
}
