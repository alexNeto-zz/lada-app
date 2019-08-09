import { Injectable } from '@angular/core';
import { SelectedAutocompleteItem } from 'ng-auto-complete';
import { ReverseCandidate } from 'src/app/content/interfaces/reverse-candidate';
import { ToastService } from 'src/app/content/services/toast/toast.service';
import { LocationFound } from '../../content/interfaces/location-found';
import { Candidate } from './../../content/interfaces/candidate';
import { CandidateConverter } from './../../content/models/candidate-converter.model';
import { ArcGisService } from './../../content/services/arc-gis/arc-gis.service';
import { GeoLocationService } from './../../content/services/geo-location/geo-location.service';
import { LocationFinderService } from './../../content/services/location/location-finder.service';
import { TitleService } from './../../content/services/title/title.service';
import { SearchDB } from './search-db.model';

@Injectable({
    providedIn: 'root'
})
export class SearchBO {

    public isLoading: boolean;
    public isLoadingGPS: boolean;
    public ask: boolean;
    public placeholder: string;
    private candidate?: Candidate;

    constructor(
        private location: LocationFinderService,
        private arcGis: ArcGisService,
        private geoLocation: GeoLocationService,
        private searchDB: SearchDB,
        private toast: ToastService,
        private title: TitleService
    ) {
        this.isLoading = false;
        this.isLoadingGPS = false;
        this.ask = false;
    }

    setCandidate(candidate: Candidate) {
        this.candidate = candidate;
        this.location.updateCandidate(candidate);
    }

    autoLocate(askGeoLocationPermission: boolean) {
        this.geoLocation.autoLocate(
            this.onGeoLocation.bind(this),
            this.onStoredCandidate.bind(this),
            askGeoLocationPermission
        );
    }

    onGeoLocation(x: number, y: number) {
        this.isLoadingGPS = true;
        this.arcGis.reverseLocation(x, y).subscribe(
            (data: ReverseCandidate) => {
                this.setCandidate(
                    new CandidateConverter()
                        .reverseCandidateToCandidate(data));
                this.searchDB.updateLocation(this.candidate);
                this.findListOfSourceForLocation();
                this.isLoadingGPS = false;
            },
            () => { this.isLoadingGPS = false; }
        );
    }

    onStoredCandidate() {
        this.searchDB.getLocation(
            (data: Candidate) => {
                this.setCandidate(data);
                this.findListOfSourceForLocation();
            },
            () => {
                this.isLoadingGPS = false;
                this.isLoading = false;
            }
        );
    }

    findListOfSourceForLocation() {
        this.isLoading = true;
        this.testIfOffline();
        this.location.findSourceList(this.candidate.attributes.Country).subscribe(
            (data: string[]) => {
                this.location.updateCountryAvailableList(data);
                this.isLoading = false;
                this.isLoadingGPS = false;
            },
            () => { }
        );
    }

    makeRequest(searchLocation, onSuccess): void {
        this.arcGis.findLocation(searchLocation)
            .subscribe((data: LocationFound) => {
                onSuccess(data);
                this.setCandidate(data.candidates[0])
                this.searchDB.updateLocation(this.candidate);
            });
    }

    selected(item: SelectedAutocompleteItem) {
        if (item.item != null) {
            this.isLoading = true;
            this.setCandidate(item.item.original.location);
            this.findListOfSourceForLocation();
        }
    }

    appendCityToTitle(x: number, y: number) {
        this.arcGis.reverseLocation(x, y).subscribe(
            (result) => { this.title.appendToTitle(result.address.City); console.log(result) },
        );
    }

    testIfOffline() {
        if (!navigator.onLine) {
            this.toast.error('Você está offline');
        }
    }
}
