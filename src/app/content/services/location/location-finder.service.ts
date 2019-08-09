import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class LocationFinderService {
    private baseUrl: string = environment.baseUrl;

    private countryAvailableList: Subject<string[]>;

    get getCountryAvailableList(): Subject<string[]> {
        return this.countryAvailableList;
    }

    constructor(private http: HttpClient) {
        this.countryAvailableList = new Subject();
    }

    findSourceList(country: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/source/list-available/${country}`);
    }

    findWeatherResume(longitude: number, latitude: number): Observable<object> {
        return this.http.get(`${this.baseUrl}/today_resume/list/${latitude}/${longitude}`);
    }

    updateCountryAvailableList(countryAvailableList: string[]): void {
        console.log(countryAvailableList);
        this.countryAvailableList.next(countryAvailableList);
    }
}
