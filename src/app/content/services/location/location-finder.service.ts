import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Candidate } from './../../interfaces/candidate';
import { Sourcelist } from './../../interfaces/sourcelist';


@Injectable({
    providedIn: 'root'
})
export class LocationFinderService {
    private baseUrl: string = environment.baseUrl;

    private countryAvailableList: Subject<Sourcelist[]>;
    public candidate: Subject<Candidate>;

    get getCountryAvailableList(): Subject<Sourcelist[]> {
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

    findTodayWeather(source: string, arg1: string | number, arg2: string | number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${source}/today/${arg1}/${arg2}`);
    }

    updateCountryAvailableList(countryAvailableList: Sourcelist[]): void {
        this.countryAvailableList.next(countryAvailableList);
    }

    updateCandidate(candidate: Candidate) {
        this.candidate.next(candidate);
    }

}
