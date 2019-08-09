import { SpatialReference } from './spatial-reference';

export interface ReverseCandidate {
    address: Address;
    location: Location;

}

export interface Address {
    Match_addr?: string;
    LongLabel?: string;
    ShortLabel?: string;
    Addr_type?: string;
    Type?: string;
    PlaceName?: string;
    AddNum?: string;
    Address: string;
    Block?: string;
    Sector?: string;
    Neighborhood?: string;
    District?: string;
    City: string;
    MetroArea?: string;
    Subregion?: string;
    Region: string;
    Territory?: string;
    Postal?: string;
    PostalExt?: string;
    CountryCode: string;
}

interface Location {
    x: number;
    y: number;
    spatialReference?: SpatialReference;
}




