import { Injectable } from '@angular/core';
import { Candidate } from '@interfaces/candidate';
import { LocationFound } from '@interfaces/location-found';
import { ReverseCandidate } from '@interfaces/reverse-candidate';
import { Sourcelist } from '@interfaces/sourcelist';
import { reverseCandidateToCandidate } from '@models/candidate-converter.model';
import { ArcGisService } from '@services/arc-gis/arc-gis.service';
import { GeoLocationService } from '@services/geo-location/geo-location.service';
import { LocationFinderService } from '@services/location/location-finder.service';
import { TitleService } from '@services/title/title.service';
import { ToastService } from '@services/toast/toast.service';
import { SelectedAutocompleteItem } from 'ng-auto-complete';
import { take } from 'rxjs/operators';
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
        this.arcGis.reverseLocation(x, y).pipe(
            take(1)
        ).subscribe(
            (data: ReverseCandidate) => {
                this.findByGeoLocation(data);
            },
            () => { this.isLoadingGPS = false; }
        );
    }

    findByGeoLocation(data: ReverseCandidate) {
        this.setCandidate(reverseCandidateToCandidate(data));
        this.searchDB.updateLocation(this.candidate);
        this.findListOfSourceForLocation();
        this.isLoadingGPS = false;
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
        this.toast.testIfOffline();
        if (this.candidate === undefined) {
            this.isLoading = false;
            this.isLoadingGPS = false;
            return;
        }
        this.location.findSourceList(this.candidate.attributes.Country)
            .pipe(take(1))
            .subscribe(
                (data: Sourcelist[]) => {
                    this.location.updateCountryAvailableList(data);
                    this.setCandidate(this.candidate);
                    this.isLoading = false;
                    this.isLoadingGPS = false;
                },
                () => {
                    this.isLoading = false;
                    this.isLoadingGPS = false;
                }
            );
    }

    makeRequest(searchLocation, onSuccess): void {
        this.arcGis.findLocation(searchLocation)
            .pipe(take(1))
            .subscribe((data: LocationFound) => {
                onSuccess(data);
                this.candidate = data.candidates[0];
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
        this.arcGis.reverseLocation(x, y)
            .pipe(take(1))
            .subscribe(
                (result) => {
                    this.title.appendToTitle(result.address.City);
                },
            );
    }
}
