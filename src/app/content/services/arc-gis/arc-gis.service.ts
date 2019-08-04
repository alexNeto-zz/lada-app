import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArcGisService {

  private arcGisBaseUrl = 'https://geocode.arcgis.com';
  private arcGisResource = '/arcgis/rest/services/World/GeocodeServer/';
  private arcGisParameters = '&outFields=City,Region,Country&maxLocations=5&f=pjson';

  constructor(private http: HttpClient) { }

  findLocation(location: string): Observable<any> {
    const arcGisService = 'findAddressCandidates?SingleLine=';
    return this.http.get(`${this.arcGisBaseUrl}${this.arcGisResource}${arcGisService}${location}${this.arcGisParameters}`);
  }

  reverseLocation(x: number, y: number): Observable<any> {
    const arcGisService = 'reverseGeocode?f=pjson&featureTypes=&location=';
    return this.http.get(`${this.arcGisBaseUrl}${this.arcGisResource}${arcGisService}${x},${y}`);
  }
}
