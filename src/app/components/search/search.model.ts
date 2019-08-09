import { Injectable } from '@angular/core';
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
    private locationFound?: LocationFound;
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

    onInitSearch(askGeoLocationPermission: boolean) {
        this.geoLocation.autoLocate(
            this.onGeoLocation.bind(this),
            this.onStoredCandidate.bind(this),
            askGeoLocationPermission
        );
    }

    onGeoLocation(x: number, y: number) {
        this.arcGis.reverseLocation(x, y).subscribe(
            (data: ReverseCandidate) => {
                this.candidate = new CandidateConverter()
                    .reverseCandidateToCandidate(data);
                this.searchDB.updateLocation(this.candidate);
                this.findListOfSourceForLocation();
            },
            () => { }
        );
    }

    onStoredCandidate() {
        this.searchDB.getLocation(
            (data: Candidate) => {
                this.candidate = data;
                this.findListOfSourceForLocation();
            },
            () => { }
        );
    }

    findListOfSourceForLocation() {
        this.location.findSourceList(this.candidate.attributes.Country).subscribe(
            (data: string[]) => {
                this.location.updateCountryAvailableList(data);
            },
            () => { }
        );
    }


    // searchStoredLocation() {
    //     this.isLoading = true;
    //     this.searchDB.getLocation(
    //         location => {
    //             if (location) {
    //                 this.findWeatherResume(location.x, location.y);
    //             } else {
    //                 this.autoLocate();
    //             }
    //         },
    //         (_) => {
    //             this.autoLocate();
    //             this.isLoading = false;
    //             this.isLoadingGPS = false;
    //         }
    //     );
    // }

    // autoLocate(ask = false) {
    //     this.ask = ask;
    //     this.autoLocateModel.autoLocate((x: number, y: number) => {
    //         this.isLoadingGPS = true;
    //         this.arcGis.reverseLocation(x, y).subscribe(

    //         )
    //         this.findWeatherResume(x, y);
    //     }, this.onBlockLocation.bind(this), ask);
    // }



    // onBlockLocation() {
    //     this.isLoadingGPS = false;
    //     this.isLoading = false;
    //     if (this.ask) {
    //         this.toast.warning('A localização está bloqueada');
    //     }
    // }

    // makeRequest(searchLocation, onSuccess): void {
    //     this.arcGis.findLocation(searchLocation)
    //         .subscribe((data: LocationFound) => {
    //             onSuccess(data);
    //             this.locationFound = data;
    //             this.candidate = data.candidates[0];
    //         });
    // }

    // selected(item: SelectedAutocompleteItem) {
    //     if (item.item != null) {
    //         this.isLoading = true;
    //         this.candidate = item.item.original.location;
    //         this.search();
    //     }
    // }

    // search() {
    //     try {
    //         const { x } = this.candidate.location;
    //         const { y } = this.candidate.location;
    //         this.isLoading = true;
    //         this.findWeatherResume(x, y);
    //     } catch (err) {
    //         // TODO - log de erros
    //         this.title.setStemTitle();
    //     }
    // }

    // appendCityToTitle(x: number, y: number) {
    //     this.arcGis.reverseLocation(x, y).subscribe(
    //         (result) => { this.title.appendToTitle(result.address.City); console.log(result) },
    //     );
    // }


    // findSourceListForCountry() {
    //     this.searchDB.updateLocation(this.candidate);
    //     this.location.findSourceList(this.candidate.attributes.Country);
    // }


    // findWeatherResume(x: number, y: number) {
    //     this.searchDB.updateLocation(x, y);
    //     this.findListOfSourceForLocation(x, y);
    // }

    // public findWeatherResume(x: number, y: number) {
    //     this.searchDB.updateLocation(x, y);
    //     this.location.findWeatherResume(x, y).subscribe(
    //         (data: DayResume[]) => {
    //             this.location.updateDayResumeList(data);
    //             this.isLoading = false;
    //             this.isLoadingGPS = false;
    //         },
    //         () => {
    //             this.isLoading = false;
    //             this.isLoadingGPS = false;
    //         });
    //     this.testIfOffline();
    //     this.appendCityToTitle(x, y);
    // }

    // getCandidates() {
    //     try {
    //         return this.locationFound.candidates;
    //     } catch (err) {
    //         return undefined;
    //     }
    // }

    // testIfOffline() {
    //     if (!navigator.onLine) {
    //         this.toast.error('Você está offline');
    //     }
    // }


}
