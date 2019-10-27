import { Injectable } from '@angular/core';
import { IndexeddbKey } from '@enums/indexed-db-key.enum';
import { IndexeddbService } from '@services/indexeddb/indexeddb.service';
import { SettingsService } from '@services/settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class DbAccessService {

  private dbName: string;
  private key: number;
  constructor(private idb: IndexeddbService, private settings: SettingsService) {
    this.dbName = this.settings.idbName;
  }

  setKey(key: IndexeddbKey) {
    this.key = key;
  }

  private getKey(key?: IndexeddbKey) {
    return key || this.key || 0;
  }

  update(data: any, key?: IndexeddbKey) {
    console.log(` getKey: ${this.getKey(key)}`);
    console.log(` this.key: ${this.key}`);
    console.log(` key: ${key}`);
    this.idb.update(this.dbName, data, this.getKey(key));
  }

  retrieve(success, error, key?: IndexeddbKey) {
    this.idb.retrieve(this.dbName, this.getKey(key), success, error);
  }
}
