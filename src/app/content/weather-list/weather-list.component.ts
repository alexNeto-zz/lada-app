import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Source } from '../models/source.model';
import { LocationFinderService } from '../services/location/location-finder.service';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit {

  @Output()
  public sourceQuantity = new EventEmitter<number>();
  sources: Source[];
  private availableCountry: string[];
  private countryAvailableList: Subject<string[]>;

  constructor(private location: LocationFinderService) {
    this.sources = [];
    this.availableCountry = [];
    this.countryAvailableList = this.location.getCountryAvailableList;
    this.countryAvailableList.subscribe(data => {
      this.availableCountry = data;
      this.createSourcesList();
    });
  }

  ngOnInit() {
    this.sources.sort((a: Source, b: Source) => b.votes - a.votes);
  }

  createSourcesList(): Source[] {
    this.sources = [];
    this.availableCountry.forEach(item => {
      this.sources.push(new Source(item, 3));
    });
    this.sourceQuantity.emit(this.sources.length);
    return this.sources;
  }

}
