import { Component, Input } from '@angular/core';
import { DayResume } from './../interfaces/day-resume';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {
  @Input() dayResume: DayResume;

  constructor() { }


}




