import { Injectable } from '@angular/core';
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

  constructor() {
    this.idbName = 'lada-idb';
    this.idbVersion = 2;
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

  create(storeName: string, value: object, key?: any) {
    this.openDatabase(storeName)
      .pipe(take(1))
      .subscribe(
        (_) => this.idb.add(storeName, value, key)
      );
  }

  retrieve(storeName: string, key: any, callback, error) {
    this.openDatabase(storeName)
      .pipe(take(1))
      .subscribe(
        (_) => from(this.idb.getByKey(storeName, key))
          .pipe(take(1))
          .subscribe(
            (item) => callback(item),
            (err) => error(err)
          ),
        (err) => error(err)
      );
  }

  update(storeName: string, value: object, key: any) {
    this.openDatabase(storeName)
      .pipe(take(1))
      .subscribe(
        (_) => {
          this.idb.delete(storeName, key);
          this.idb.add(storeName, value, key);
        });
  }

  delete(storeName: string, key: any) {
    this.openDatabase(storeName)
      .pipe(take(1))
      .subscribe(
        (_) => from(this.idb.delete(storeName, key))
      );
  }
}
