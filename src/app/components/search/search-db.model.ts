import { Injectable } from '@angular/core';
import { IndexeddbService } from 'src/app/content/services/indexeddb/indexeddb.service';

@Injectable({
    providedIn: 'root'
})
export class SearchDB {

    constructor(private idb: IndexeddbService) {    }

    updateLocation(x: number, y: number) {
        const key = 1;
        this.idb.update('location', { x: x, y: y }, key);
    }

    getLocation(success, error) {
        this.idb.retrieve('location', 1, success, error);
    }
}
