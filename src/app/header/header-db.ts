import { Injectable } from '@angular/core';
import { IndexeddbService } from 'src/app/content/services/indexeddb/indexeddb.service';
import { Settings } from '../content/interfaces/settings';
import { SettingsService } from '../content/services/settings/settings.service';


@Injectable({
    providedIn: 'root'
})
export class HeaderDB {

    private dbName: string;
    private key: number;
    constructor(private idb: IndexeddbService, private settings: SettingsService) {
        this.dbName = this.settings.idbName;
        this.key = 2;
    }

    updateSettings(settings: Settings) {
        this.idb.update(this.dbName, settings, this.key);
    }

    getSettings(success, error) {
        this.idb.retrieve(this.dbName, this.key, success, error);
    }
}
