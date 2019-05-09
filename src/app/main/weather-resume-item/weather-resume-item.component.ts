import { Component, OnInit, Input } from '@angular/core';
import { Font } from '../font.model';

@Component({
  selector: 'app-weather-resume-item',
  templateUrl: './weather-resume-item.component.html',
  styleUrls: ['./weather-resume-item.component.scss']
})
export class WeatherResumeItemComponent implements OnInit {

  @Input() font: Font;
  constructor() {

  }

  ngOnInit() {
  }

}
