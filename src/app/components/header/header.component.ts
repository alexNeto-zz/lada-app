import { Component, OnInit } from '@angular/core';
import { IndexeddbKey } from '@enums/indexed-db-key.enum';
import { Settings } from '@interfaces/settings';
import { IndexeddbService } from '@services/indexeddb/indexeddb.service';
import { SettingsService } from '@services/settings/settings.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public title: string;
  public isActive: boolean;
  private savedSettings: Settings;
  private key: number;

  constructor(private settings: SettingsService, private idb: IndexeddbService) {
    this.key = IndexeddbKey.temperature_unit;
    this.title = 'Lada-app';
    this.isActive = false;
    this.savedSettings = {
      temperatureScale: 'C'
    };
  }

  get temperatureScale() {
    return this.settings.temperatureScale;
  }

  ngOnInit() {
    this.settingsSetup();
  }

  settingsSetup() {
    this.idb.retrieve(
      this.key,
      this.getSettings.bind(this),
      this.createNewSetting.bind(this)
    );
  }

  getSettings(settings: Settings) {
    if (settings !== undefined) {
      this.savedSettings = settings;
      this.settings.temperatureScale = settings.temperatureScale;
    } else {
      this.createNewSetting();
    }
  }

  createNewSetting() {
    this.idb.update(this.key, this.savedSettings);
  }

  toggleTemperatureScale(scale: string) {
    this.settings.temperatureScale = scale;
    this.savedSettings.temperatureScale = scale;
    this.idb.update(this.key, this.savedSettings);
  }

  toggleMenu(toState?: boolean) {
    if (toState === undefined) {
      this.isActive = !this.isActive;
    } else {
      this.isActive = toState;
    }
  }
}
