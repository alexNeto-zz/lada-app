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

  @Output()
  locationFound?: LocationFound;

  constructor(private location: LocationFinderService) {
    this.placeholder = "Procure por uma localização";
    this.address = "";
  }

  ngOnInit() {
  }

  showLocations(searchLocation) {
    this.location.findLocation(searchLocation)
      .subscribe((data: LocationFound) => {
        this.locationFound = data;
        this.updateAddress();
      });

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
