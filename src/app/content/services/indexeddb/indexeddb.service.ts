import { Injectable } from '@angular/core';
import { SettingsService } from '@services/settings/settings.service';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { from, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IndexeddbService {

  private idb: NgxIndexedDB;
  private idbName: string;
  private idbVersion: number;

  constructor(private settings: SettingsService) {
    this.idbName = this.settings.idbName;
    this.idbVersion = this.settings.idbVersion;
    this.idb = new NgxIndexedDB(this.idbName, this.idbVersion);
  }

  public setIDBTo(idbName: string, idbVersion: number): IndexeddbService {
    this.idbName = idbName;
    this.idbVersion = idbVersion;
    this.idb = new NgxIndexedDB(idbName, idbVersion);
    return this;
  }

  openDatabase(storeName): Observable<any> {
    return from(this.idb.openDatabase(1, e => {
      e.currentTarget.result.createObjectStore(storeName);
    }));
  }

  create(key: number, value: object) {
    this.openDatabase(this.idbName)
      .pipe(take(1))
      .subscribe(
        (_) => this.idb.add(this.idbName, value, key)
      );
  }

  retrieve(key: number, callback, error) {

    const success = (_) => from(this.idb.getByKey(this.idbName, key))
      .pipe(take(1))
      .subscribe(
        (item) => callback(item),
        (err) => error(err)
      );

    this.openDatabase(this.idbName)
      .pipe(take(1))
      .subscribe(
        success,
        (err) => error(err)
      );
  }

  update(key: number, value: object) {

    const success = (_) => {
      this.idb.delete(this.idbName, key);
      this.idb.add(this.idbName, value, key);
    };

    this.openDatabase(this.idbName)
      .pipe(take(1))
      .subscribe(success);
  }

  delete(key: number) {
    this.openDatabase(this.idbName)
      .pipe(take(1))
      .subscribe(
        (_) => from(this.idb.delete(this.idbName, key))
      );
  }
}
