import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationFinderService {

  constructor(private http: HttpClient) { }

  findLocation(location: string) {
    console.log(location)
    return this.http.get(`http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=${location}&outFields=City,Region,Country&maxLocations=5&f=pjson`);
  }
}
