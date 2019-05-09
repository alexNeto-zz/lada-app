import { Component, OnInit } from '@angular/core';
import { Font } from '../font.model';

@Component({
  selector: 'app-weather-resume-list',
  templateUrl: './weather-resume-list.component.html',
  styleUrls: ['./weather-resume-list.component.scss']
})
export class WeatherResumeListComponent implements OnInit {

  fonts: Font[]
  constructor() {
    this.fonts = [new Font().get()]
  }

  ngOnInit() {
  }

}
