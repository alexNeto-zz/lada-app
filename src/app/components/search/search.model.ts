import { Injectable } from '@angular/core';
import { SelectedAutocompleteItem } from 'ng-auto-complete';
import { ToastService } from 'src/app/content/services/toast/toast.service';
import { DayResume } from './../../content/models/day-resume';
import { Candidate, LocationFound } from './../../content/models/location-found';
import { LocationFinderService } from './../../content/services/location/location-finder.service';
import { AutoLocateModel } from './auto-locate.model';
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
        private autoLocateModel: AutoLocateModel,
        private searchDB: SearchDB,
        private toast: ToastService
    ) {
        this.isLoading = false;
        this.isLoadingGPS = false;
        this.ask = false;
    }


    autoLocate(ask = false) {
        this.ask = ask;
        this.autoLocateModel.autoLocate((x: number, y: number) => {
            this.isLoadingGPS = true;
            this.findWeatherResume(x, y);
        }, this.onBlockLocation.bind(this), ask);
    }

    onBlockLocation() {
        this.isLoadingGPS = false;
        this.isLoading = false;
        if (this.ask) {
            this.toast.warning('A localização está bloqueada');
        }
    }

    makeRequest(searchLocation, onSuccess): void {
        this.location.findLocation(searchLocation)
            .subscribe((data: LocationFound) => {
                onSuccess(data);
                this.locationFound = data;
                this.candidate = data.candidates[0];
            });
    }

    selected(item: SelectedAutocompleteItem) {
        if (item.item != null) {
            this.isLoading = true;
            this.candidate = item.item.original.location;
            this.search();
        }
    }

    search() {
        try {
            const { x } = this.candidate.location;
            const { y } = this.candidate.location;
            this.isLoading = true;
            this.findWeatherResume(x, y);
        } catch (err) {
            console.log(err);
        }
    }

    public findWeatherResume(x: number, y: number) {
        this.searchDB.updateLocation(x, y);
        this.location.findWeatherResume(x, y).subscribe((data: DayResume[]) => {
            this.location.updateDayResumeList(data);
            this.isLoading = false;
            this.isLoadingGPS = false;
        });
    }

    getCandidates() {
        try {
            return this.locationFound.candidates;
        } catch (err) {
            return undefined;
        }
    }

    searchStoredLocation() {
        this.isLoading = true;
        this.searchDB.getLocation(
            location => {
                if (location) {
                    this.findWeatherResume(location.x, location.y);
                } else {
                    this.autoLocate();
                }
            },
            (_) => {
                this.autoLocate();
                this.isLoading = false;
                this.isLoadingGPS = false;
            }
        );
    }
}
