import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _temperatureScale: string;
  private _idbName: string;
  private _idbVersion: number;

  constructor() {
    this._temperatureScale = 'C';
    this._idbName = 'lada-idb';
    this._idbVersion = 3;
  }

  set temperatureScale(temperatureScale: string) {
    this._temperatureScale = temperatureScale;
  }

  get temperatureScale(): string {
    return this._temperatureScale;
  }

  get idbName(): string {
    return this._idbName;
  }

  get idbVersion(): number {
    return this._idbVersion;
  }

  getLocale() {
    return 'pt';
  }
}
