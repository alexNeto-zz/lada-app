import { Component, Input, OnInit } from '@angular/core';
import { Source } from '../models/source.model';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  @Input() source: Source;
  public currentWeather: string;

  constructor() {
  }

  ngOnInit() {
  }
}
