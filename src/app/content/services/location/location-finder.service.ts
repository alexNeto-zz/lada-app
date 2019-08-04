import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DayResume } from '../../models/day-resume';
import { ToastService } from '../toast/toast.service';


@Injectable({
    providedIn: 'root'
})
export class LocationFinderService {
    private baseUrl: string = environment.baseUrl;
    private dayResumeList: Subject<DayResume[]>;
    get getDayResumeList(): Subject<DayResume[]> {
        return this.dayResumeList;
    }

    constructor(private http: HttpClient, private toast: ToastService) {
        this.dayResumeList = new Subject();
    }

    findWeatherResume(longitude: number, latitude: number): Observable<object> {
        return this.http.get(`${this.baseUrl}/today_resume/list/${latitude}/${longitude}`);
    }

    updateDayResumeList(dayResumeList: DayResume[]): void {
        this.dayResumeList.next(dayResumeList);
    }
}
