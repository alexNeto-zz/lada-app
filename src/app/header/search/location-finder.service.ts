import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DayResume } from './../../main/weather-resume-item/day-resume';

@Injectable({
  providedIn: 'root'
})
export class LocationFinderService {

  private dayResumeList: Subject<DayResume[]>;
  get getDayResumeList(): Subject<DayResume[]> {
    return this.dayResumeList;
  }

  constructor(private http: HttpClient) {
    this.dayResumeList = new Subject();
  }

  findLocation(location: string): Observable<Object> {
    return this.http.get(`http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=${location}&outFields=City,Region,Country&maxLocations=5&f=pjson`);
  }

  findWeatherResume(longitude: number, latitude: number): Observable<Object> {
    return this.http.get(`http://127.0.0.1:5000/today_resume/list/${latitude}/${longitude}`);
  }

  updateDayResumeList(dayResumeList: DayResume[]): void {
    this.dayResumeList.next(dayResumeList);
  }
}
