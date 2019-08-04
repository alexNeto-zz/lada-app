import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastService } from '../toast/toast.service';

@Injectable({
    providedIn: 'root'
})
export class NavigatorUtilsService {

    constructor(private toast: ToastService) { }

    makeRequestIfOnline(request): Observable<any> {
        if (!navigator.onLine) {
            this.toast.error('Você está offline');
        }
        return request();
    }
}
