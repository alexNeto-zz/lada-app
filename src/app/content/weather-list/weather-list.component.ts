import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Sourcelist } from '../interfaces/sourcelist';
import { LocationFinderService } from '../services/location/location-finder.service';
import { Candidate } from './../interfaces/candidate';
import { Card } from './../interfaces/card';
import { DayResume } from './../interfaces/day-resume';
import { TitleService } from './../services/title/title.service';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit, OnDestroy {

  @Output()
  public sourceQuantity = new EventEmitter<number>();
  public sourceList: Sourcelist[];
  private countryAvailableList: Subject<Sourcelist[]>;
  private subscription: Subscription[];
  public cardList: Card[];
  public candidate: Candidate;

  constructor(private location: LocationFinderService, private title: TitleService) {
    this.subscription = [];
    this.sourceList = [];
    this.cardList = [];
    this.countryAvailableList = this.location.getCountryAvailableList;
  }

  ngOnInit() {
    this.subscription.push(this.countryAvailableList
      .subscribe((data: Sourcelist[]) => {
        this.sourceList = data;
        this.getForecasts();
        this.sourceQuantity.emit(this.sourceList.length);
      },
        () => {
          this.sourceQuantity.emit(0);
          this.sourceList = [];
        }));
  }

  getForecasts() {
    this.location.getCandidate
      .pipe(take(1))
      .subscribe(
        (data: Candidate) => {
          this.candidate = data;
          this.makeRequest();
          this.title.appendToTitle(data.attributes.City);
        },
        () => { }
      );
  }

  makeRequest() {
    this.cardList = this.sourceList.map(i => undefined);
    this.subscription.push(from(this.sourceList).pipe(
      mergeMap(source => <Observable<DayResume>>this.buildRequest(source))
    ).subscribe(
      (dayResume: DayResume) => {
        const card = {
          dayResume: dayResume,
          location: `${this.candidate.attributes.Region}:${this.candidate.attributes.City}`
        };
        this.cardList.unshift(card);
      },
      () => this.cardList.pop()
    ));
  }

  buildRequest(source: Sourcelist): Observable<any> {
    if (source.params === 'x:y') {
      return this.location.findTodayWeather(source.source, this.candidate.location.x, this.candidate.location.y);
    } else {
      return this.location.findTodayWeather(source.source, this.candidate.attributes.Region, this.candidate.attributes.City);
    }
  }

  ngOnDestroy() {
    this.subscription.forEach(s => s.unsubscribe());
    this.sourceQuantity.unsubscribe();
  }
}
