import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Source } from './source.model';

@Component({
  selector: 'app-weather-resume-item',
  templateUrl: './weather-resume-item.component.html',
  styleUrls: ['./weather-resume-item.component.scss']
})
export class WeatherResumeItemComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'row';
  @Input() source: Source;

  constructor() {
  }

  voteUp(): boolean {
    this.source.voteUp();
    return false;
  }
  voteDown(): boolean {
    this.source.voteDown();
    return false;
  }

  ngOnInit() {
  }
}
