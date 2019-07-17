import { LocationFinderService } from './../../content/services/location/location-finder.service';
import { DayResume } from './../../content/models/day-resume';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateNewAutocompleteGroup, NgAutoCompleteComponent, SelectedAutocompleteItem } from 'ng-auto-complete';
import { LocationFound } from './../../content/models/location-found';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild(NgAutoCompleteComponent, null) public completer: NgAutoCompleteComponent;

  public group = [
    CreateNewAutocompleteGroup(
      'Procure por uma localização',
      'completer',
      [],
      { titleKey: 'title', childrenKey: null }
    ),
  ];

  Selected(item: SelectedAutocompleteItem) {
    // console.log(item.item.original.teste);
  }

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
    this.timeout = setTimeout(() => this.makeRequestToLocation(searchLocation.target.value), 300);
  }

  makeRequestToLocation(searchLocation): void {
    this.location.findLocation(searchLocation)
      .subscribe((data: LocationFound) => {
        this.completer.SetValues('completer', this.getLocationList(data))
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

  private getLocationList(data: LocationFound) {
    return data.candidates.map((item, index) => {
      return { title: item.address, id: index, location: item };
    });
    // return [
    //   { title: 'Option 4', id: '1', teste: [1, 2, 3, 4] },
    //   { title: 'Option 5', id: '2', teste: [1, 2, 3, 4] },
    //   { title: 'Option 6', id: '3', teste: [1, 2, 3, 4] },
    //   { title: 'Option 7', id: '4', teste: [1, 2, 3, 4] },
    //   { title: 'Option 8', id: '5', teste: [1, 2, 3, 4] },
    //   { title: 'Option 9', id: '6', teste: [1, 2, 3, 4] },
    // ];
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
