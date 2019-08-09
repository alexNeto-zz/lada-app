import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { Candidate } from './../interfaces/candidate';
import { DayResume } from './../interfaces/day-resume';
import { LocationFinderService } from './../services/location/location-finder.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  @Input() sourceName: string;
  @Output() removeItem = new EventEmitter<string>();
  public currentWeather: string;
  public dayResume: DayResume;
  private candidate: Candidate;

  constructor(private location: LocationFinderService) {
    this.candidate = this.location.candidate;
  }

  ngOnInit() {
    this.location.findTodayWeatherByRegionAndCity(
      this.sourceName,
      this.candidate.attributes.Region,
      this.candidate.attributes.City).pipe(take(1)).subscribe(
        (data: DayResume) => {
          this.dayResume = data;
        },
        () => {
          this.removeItem.emit(this.sourceName);
        });
  }
}




