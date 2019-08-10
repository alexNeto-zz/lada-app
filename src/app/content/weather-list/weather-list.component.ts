import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Sourcelist } from '../interfaces/sourcelist';
import { LocationFinderService } from '../services/location/location-finder.service';
import { Candidate } from './../interfaces/candidate';
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
  public dayResumeList: DayResume[];

  constructor(private location: LocationFinderService, private title: TitleService) {
    this.subscription = [];
    this.sourceList = [];
    this.dayResumeList = [];
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
          this.makeRequest(data);
          this.title.appendToTitle(data.attributes.City);
        },
        () => { }
      );
  }

  makeRequest(candidate: Candidate) {
    this.dayResumeList = [];
    this.subscription.push(from(this.sourceList).pipe(
      mergeMap(source => <Observable<DayResume>>this.buildRequest(source, candidate))
    ).subscribe(
      (dayResume: DayResume) => {
        this.dayResumeList.unshift(dayResume);
      },
      () => { }
    ));
  }

  buildRequest(source: Sourcelist, candidate: Candidate): Observable<any> {
    if (source.params === 'x:y') {
      return this.location.findTodayWeather(source.source, candidate.location.x, candidate.location.y);
    } else {
      return this.location.findTodayWeather(source.source, candidate.attributes.Region, candidate.attributes.City);
    }
  }

  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe();
    });
  }
}
