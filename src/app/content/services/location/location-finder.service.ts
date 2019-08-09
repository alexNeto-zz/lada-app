import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candidate } from './../../interfaces/candidate';


@Injectable({
    providedIn: 'root'
})
export class LocationFinderService {
    private baseUrl: string = environment.baseUrl;

    private countryAvailableList: Subject<string[]>;
    public candidate: Candidate;

    get getCountryAvailableList(): Subject<string[]> {
        return this.countryAvailableList;
    }

    constructor(private http: HttpClient) {
        this.countryAvailableList = new Subject();
    }

    findSourceList(country: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/source/list-available/${country}`);
    }

    findTodayWeatherByRegionAndCity(source: string, region: string, city: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${source}/today/${region}/${city}`);
    }

    updateCountryAvailableList(countryAvailableList: string[]): void {
        this.countryAvailableList.next(countryAvailableList);
    }


}
