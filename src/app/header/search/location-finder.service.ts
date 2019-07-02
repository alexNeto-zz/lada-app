import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DayResume } from './../../main/weather-resume-item/day-resume';


@Injectable({
  providedIn: 'root'
})
export class LocationFinderService {
  private baseUrl: string = environment.baseUrl;
  private dayResumeList: Subject<DayResume[]>;
  get getDayResumeList(): Subject<DayResume[]> {
    return this.dayResumeList;
  }

  constructor(private http: HttpClient) {
    this.dayResumeList = new Subject();
  }

  findLocation(location: string): Observable<Object> {
    return this.http.get(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=${location}&outFields=City,Region,Country&maxLocations=5&f=pjson`);
  }

  findWeatherResume(longitude: number, latitude: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/today_resume/list/${latitude}/${longitude}`);
  }

  updateDayResumeList(dayResumeList: DayResume[]): void {
    this.dayResumeList.next(dayResumeList);
  }
}
