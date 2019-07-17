import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private arcGisBaseUrl = 'https://geocode.arcgis.com';
  private arcGisResource = '/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';
  private arcGisParameters = '&outFields=City,Region,Country&maxLocations=5&f=pjson';


  findLocation(location: string): Observable<any> {
    return this.http.get(`${this.arcGisBaseUrl}${this.arcGisResource}?SingleLine=${location}${this.arcGisParameters}`);
  }

  clientID: string = 'PAST YOUR CLIENT ID';
  baseUrl: string = 'https://api.spotify.com/v1/search?type=artist&limit=10&client_id=' + this.clientID + '&q=';

  constructor(private http: HttpClient) { }
}
