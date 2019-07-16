import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LocationFinderService } from '../../content/services/location/location-finder.service';
import { DayResume } from './../../content/models/day-resume';
import { LocationFound } from './../../content/models/location-found';

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
    this.autoLocate();
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
      this.findWeatherResume(x, y);
    } catch (err) {
      console.log(err);
    }
  }

  private findWeatherResume(x: number, y: number) {
    this.location.findWeatherResume(x, y).subscribe((data: DayResume[]) => this.location.updateDayResumeList(data));
  }

  private autoLocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.findWeatherResume(position.coords.longitude, position.coords.latitude);
      }, () => { }, this.geoOptions());
    }
  }

  private geoOptions(): object {
    return {
      maximumAge: 5 * 60 * 1000
    };
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
