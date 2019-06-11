import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationFinderService {

  constructor(private http: HttpClient) { }

  findLocation(location: string): Observable<Object> {
    return this.http.get(`http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=${location}&outFields=City,Region,Country&maxLocations=5&f=pjson`);
  }

  findWeatherResume(x: string, y: string) {
    return this.http.get(`localhost:5000/${x}/${y}`);
  }
}
