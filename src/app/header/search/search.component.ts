import { Component, OnInit, Output } from '@angular/core';
import { LocationFinderService } from './location-finder.service';
import { LocationFound } from './location-found';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  protected placeholder: string;
  protected address: string;
  private timeout;

  @Output()
  locationFound?: LocationFound;

  constructor(private location: LocationFinderService) {
    this.placeholder = "Procure por uma localização";
    this.address = "";
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
      })
  }

  search() {
  }

  updateAddress() {
    try {
      const city = this.locationFound.candidates[0].attributes.City;
      const region = this.locationFound.candidates[0].attributes.Region;
      this.address = `${city} - ${region}`;
    } catch (err) {
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
