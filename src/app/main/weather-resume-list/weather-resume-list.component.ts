import { DayResume } from './../weather-resume-item/day-resume';
import { Component, OnInit } from '@angular/core';
import { Source } from '../weather-resume-item/source.model';

@Component({
  selector: 'app-weather-resume-list',
  templateUrl: './weather-resume-list.component.html',
  styleUrls: ['./weather-resume-list.component.scss']
})
export class WeatherResumeListComponent implements OnInit {
  sources: Source[];
  private dayResume: DayResume;

  constructor() {
    this.sources = [
      new Source({
        weatherCondition: "string",
        maximumTemperature: "string",
        minimumTemperature: "string",
        rainProbability: "string",
        source: "string",
        sourceLogo: "string",
        link: "string"
      }, 3),
      new Source({
        weatherCondition: "string",
        maximumTemperature: "string",
        minimumTemperature: "string",
        rainProbability: "string",
        source: "string",
        sourceLogo: "string",
        link: "string"
      }, 2),
      new Source({
        weatherCondition: "string",
        maximumTemperature: "string",
        minimumTemperature: "string",
        rainProbability: "string",
        source: "string",
        sourceLogo: "string",
        link: "string"
      }, 1)
    ];
  }

  ngOnInit() {
    this.sources.sort((a: Source, b: Source) => b.votes - a.votes);
  }

}
