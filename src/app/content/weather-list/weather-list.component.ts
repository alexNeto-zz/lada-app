import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { LocationFinderService } from '../services/location/location-finder.service';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit, OnDestroy {

  @Output()
  public sourceQuantity = new EventEmitter<number>();
  public sourceNames: string[];
  private countryAvailableList: Subject<string[]>;

  constructor(private location: LocationFinderService) {
    this.sourceNames = [];
    this.countryAvailableList = this.location.getCountryAvailableList;
  }

  removeItem(sourceNameToRemove: string) {
    this.sourceNames = this.sourceNames.filter(item => item !== sourceNameToRemove);
  }

  ngOnInit() {
    this.countryAvailableList.subscribe((data: string[]) => {
      this.sourceNames = data;
      this.sourceQuantity.emit(this.sourceNames.length);
    });
  }

  ngOnDestroy() {
    this.countryAvailableList.unsubscribe();
  }
}
