import { Injectable } from '@angular/core';
import { IndexeddbKey } from '@enums/indexed-db-key.enum';
import { Candidate } from '@interfaces/candidate';
import { IndexeddbService } from '@services/indexeddb/indexeddb.service';
import { SettingsService } from '@services/settings/settings.service';

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
