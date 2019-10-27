import { Component, OnInit } from '@angular/core';
import { IndexeddbKey } from '@enums/indexed-db-key.enum';
import { Settings } from '@interfaces/settings';
import { DbAccessService } from '@services/indexeddb/db-access.service';
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
 
  constructor(private settings: SettingsService, private dbAccess: DbAccessService) {
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
    this.dbAccess.retrieve(
      this.getSettings.bind(this),
      this.createNewSetting.bind(this),
      this.key
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
    this.dbAccess.update(this.savedSettings, this.key);
  }

  toggleTemperatureScale(scale: string) {
    this.settings.temperatureScale = scale;
    this.savedSettings.temperatureScale = scale;
    this.dbAccess.update(this.savedSettings, this.key);
  }

  toggleMenu(toState?: boolean) {
    if (toState === undefined) {
      this.isActive = !this.isActive;
    } else {
      this.isActive = toState;
    }
  }
}
