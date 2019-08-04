import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CreateNewAutocompleteGroup, NgAutoCompleteComponent, SelectedAutocompleteItem } from 'ng-auto-complete';
import { LocationFound } from './../../content/models/location-found';
import { SearchBO } from './search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild(NgAutoCompleteComponent, null) public completer: NgAutoCompleteComponent;

  get isLoading() {
    return this.searchBO.isLoading;
  }

  get isLoadingGPS() {
    return this.searchBO.isLoadingGPS;
  }

  public group = [
    CreateNewAutocompleteGroup(
      'Procure por uma localização',
      'completer',
      [],
      { titleKey: 'title', childrenKey: null }
    ),
  ];

  public placeholder: string;
  private timeout: any;

  constructor(private searchBO: SearchBO) {
    this.placeholder = 'Procure por uma localização';
  }

  ngOnInit() {
    this.searchBO.searchStoredLocation();
  }

  showLocations(searchLocation) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.makeRequestToLocation(searchLocation.target.value), 300);
  }

  makeRequestToLocation(searchLocation): void {
    this.searchBO.makeRequest(searchLocation, this.onRequestSuccess.bind(this));
  }

  private onRequestSuccess(data: LocationFound) {
    this.completer.SetValues('completer', this.getLocationList(data));
  }

  public getLocationList(data: LocationFound) {
    return data.candidates.filter(
      (item) => item.attributes.City !== ''
    ).map((item, index) => {
      return { title: item.address, id: index, location: item };
    });
  }

  selected(item: SelectedAutocompleteItem) {
    this.searchBO.selected(item);
  }

  search() {
    this.searchBO.search();
  }

  searchGPS(ask = false) {
    this.searchBO.autoLocate(ask);
  }
}
