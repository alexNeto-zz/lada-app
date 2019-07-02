import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Source } from '../weather-resume-item/source.model';
import { LocationFinderService } from './../../header/search/location-finder.service';
import { DayResume } from './../weather-resume-item/day-resume';

@Component({
  selector: 'app-weather-resume-list',
  templateUrl: './weather-resume-list.component.html',
  styleUrls: ['./weather-resume-list.component.scss']
})
export class WeatherResumeListComponent implements OnInit {
  sources: Source[];
  private dayResumeList: DayResume[];
  private sourceDayResume: Subject<DayResume[]>;

  constructor(private location: LocationFinderService) {
    this.sources = [];
    this.dayResumeList = [];
    this.sourceDayResume = this.location.getDayResumeList;
    this.sourceDayResume.subscribe(data => {
      this.dayResumeList = data;
      this.createSourcesList();
    });
  }

  ngOnInit() {
    this.sources.sort((a: Source, b: Source) => b.votes - a.votes);
  }

  createSourcesList(): Source[] {
    this.sources = [];
    this.dayResumeList.forEach(item => {
      this.sources.push(new Source(item, 3));
    });
    return this.sources;
  }
}
