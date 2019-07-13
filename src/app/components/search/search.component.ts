import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DayResume } from './../../content/models/day-resume';
import { LocationFound } from './../../content/models/location-found';
import { LocationFinderService } from './../../content/Services/location/location-finder.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public placeholder: string;
  public address: string;
  private timeout: any;
  private locationFound?: LocationFound;
  private sourceDayResume: Subject<DayResume[]>;

  constructor(private location: LocationFinderService) {
    this.placeholder = 'Procure por uma localização';
    this.address = '';
    this.sourceDayResume = this.location.getDayResumeList;
  }

  ngOnInit() {
  }

  showLocations(searchLocation) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.makeRequestToLocation(searchLocation), 250);
  }

  makeRequestToLocation(searchLocation): void {
    this.location.findLocation(searchLocation)
      .subscribe((data: LocationFound) => {
        this.locationFound = data;
        this.updateAddress();
      });
  }

  search() {
    try {
      const { x } = this.locationFound.candidates[0].location;
      const { y } = this.locationFound.candidates[0].location;
      this.location.findWeatherResume(x, y).subscribe((data: DayResume[]) => this.location.updateDayResumeList(data));
    } catch (err) {
      console.log(err);
    }
  }

  updateAddress() {
    try {
      const city = this.locationFound.candidates[0].attributes.City;
      const region = this.locationFound.candidates[0].attributes.Region;
      this.address = `${city} - ${region}`;
    } catch (err) {
      this.address = '';
    }
  }

  getCandidates() {
    try {
      return this.locationFound.candidates;
    } catch (err) {
      return undefined;
    }
  }
}
