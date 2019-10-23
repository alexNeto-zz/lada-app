import { Injectable } from '@angular/core';
import { IndexeddbKey } from 'src/app/content/enums/indexed-db-key.enum';
import { IndexeddbService } from 'src/app/content/services/indexeddb/indexeddb.service';
import { SettingsService } from 'src/app/content/services/settings/settings.service';
import { Candidate } from './../../content/interfaces/candidate';

@Injectable({
    providedIn: 'root'
})
export class SearchDB {

    private dbName: string;
    private key: number;
    constructor(private idb: IndexeddbService, private settings: SettingsService) {
        this.dbName = this.settings.idbName;
        this.key = IndexeddbKey.address;
    }

    updateLocation(candidate: Candidate) {
        this.idb.update(this.dbName, candidate, this.key);
    }

    getLocation(success, error) {
        this.idb.retrieve(this.dbName, this.key, success, error);
    }
}
