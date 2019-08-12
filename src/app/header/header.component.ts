import { Component, OnInit } from '@angular/core';
import { Settings } from './../content/interfaces/settings';
import { SettingsService } from './../content/services/settings/settings.service';
import { HeaderDB } from './header-db';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public title: string;
  public isActive: boolean;
  private savedSettings: Settings;

  constructor(private settings: SettingsService, private headerDB: HeaderDB) {
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
    this.headerDB.getSettings(
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
    this.headerDB.updateSettings(this.savedSettings);
  }

  toggleTemperatureScale(scale: string) {
    this.settings.temperatureScale = scale;
    this.savedSettings.temperatureScale = scale;
    this.headerDB.updateSettings(this.savedSettings);
  }

  toggleMenu() {
    this.isActive = !this.isActive;
  }
}
