import { Injectable } from '@angular/core';
import { SelectedAutocompleteItem } from 'ng-auto-complete';
import { DayResume } from './../../content/models/day-resume';
import { Candidate, LocationFound } from './../../content/models/location-found';
import { LocationFinderService } from './../../content/services/location/location-finder.service';
import { AutoLocateModel } from './auto-locate.model';

@Injectable({
    providedIn: 'root'
})
export class SearchBO {

    public placeholder: string;
    private locationFound?: LocationFound;
    private candidate?: Candidate;

    constructor(private location: LocationFinderService, private autoLocateModel: AutoLocateModel) {
    }

    autoLocate() {
        this.autoLocateModel.autoLocate(this.findWeatherResume.bind(this));
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
            this.candidate = item.item.original.location;
        }
    }

    search() {
        try {
            const { x } = this.candidate.location;
            const { y } = this.candidate.location;
            this.findWeatherResume(x, y);
        } catch (err) {
            console.log(err);
        }
    }

    public findWeatherResume(x: number, y: number) {
        this.location.findWeatherResume(x, y).subscribe((data: DayResume[]) => this.location.updateDayResumeList(data));
    }

    getCandidates() {
        try {
            return this.locationFound.candidates;
        } catch (err) {
            return undefined;
        }
    }
}
