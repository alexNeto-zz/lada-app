import { Injectable } from '@angular/core';
import { IndexeddbService } from 'src/app/content/services/indexeddb/indexeddb.service';
import { Candidate } from './../../content/interfaces/candidate';


@Injectable({
    providedIn: 'root'
})
export class SearchDB {

    constructor(private idb: IndexeddbService) { }

    updateLocation(candidate: Candidate) {
        const key = 1;
        this.idb.update('location', candidate, key);
    }

    getLocation(success, error) {
        this.idb.retrieve('location', 1, success, error);
    }
}
