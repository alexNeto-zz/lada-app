import { Injectable } from '@angular/core';
import { IndexeddbKey } from '@enums/indexed-db-key.enum';
import { Settings } from '@interfaces/settings';
import { IndexeddbService } from '@services/indexeddb/indexeddb.service';
import { SettingsService } from '@services/settings/settings.service';



@Injectable({
    providedIn: 'root'
})
export class HeaderDB {

    private dbName: string;
    private key: number;
    constructor(private idb: IndexeddbService, private settings: SettingsService) {
        this.dbName = this.settings.idbName;
        this.key = IndexeddbKey.temperature_unit;
    }

    updateSettings(settings: Settings) {
        this.idb.update(this.dbName, settings, this.key);
    }

    getSettings(success, error) {
        this.idb.retrieve(this.dbName, this.key, success, error);
    }
}
