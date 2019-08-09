import { Injectable } from '@angular/core';
import { IndexeddbService } from 'src/app/content/services/indexeddb/indexeddb.service';
import { Candidate } from './../../content/interfaces/candidate';


@Injectable({
    providedIn: 'root'
})
export class SearchDB {

    private dbName: string;
    constructor(private idb: IndexeddbService) {
        this.dbName = 'candidate';
    }

    updateLocation(candidate: Candidate) {
        const key = 1;
        this.idb.update(this.dbName, candidate, key);
    }

    getLocation(success, error) {
        this.idb.retrieve(this.dbName, 1, success, error);
    }
}
