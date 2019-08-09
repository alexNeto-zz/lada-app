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
    private candidate: Subject<Candidate>;

    get getCountryAvailableList(): Subject<string[]> {
        return this.countryAvailableList;
    }

    get getCandidate(): Subject<Candidate> {
        return this.candidate;
    }

    constructor(private http: HttpClient) {
        this.countryAvailableList = new Subject();
        this.candidate = new Subject();
    }

    findSourceList(country: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/source/list-available/${country}`);
    }

    findWeatherResume(longitude: number, latitude: number): Observable<object> {
        return this.http.get(`${this.baseUrl}/today_resume/list/${latitude}/${longitude}`);
    }

    updateCountryAvailableList(countryAvailableList: string[]): void {
        this.countryAvailableList.next(countryAvailableList);
    }

    updateCandidate(candidate: Candidate): void {
        this.candidate.next(candidate);
    }
}
