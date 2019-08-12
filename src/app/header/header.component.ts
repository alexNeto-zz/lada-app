import { Component, OnDestroy, OnInit } from '@angular/core';
import { Settings } from './../content/interfaces/settings';
import { SettingsService } from './../content/services/settings/settings.service';
import { HeaderDB } from './header-db';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public title: string;
  private titles: string[];
  private interval;
  public isActive: boolean;
  private savedSettings: Settings;

  constructor(private settings: SettingsService, private headerDB: HeaderDB) {
    this.titles = ['Lada', 'Лада', 'Łada', 'ლადა'];
    this.isActive = false;
    this.savedSettings = {
      temperatureScale: 'C'
    };
  }

  ngOnInit() {
    this.setNewNameToTitle();
    this.interval = setInterval(() => {
      this.setNewNameToTitle();
    }, 2000);
    this.settingsSetup();
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  settingsSetup() {
    this.headerDB.getSettings(
      (settings: Settings) => {
        if (settings !== undefined) {
          this.savedSettings = settings;
          this.settings.temperatureScale = settings.temperatureScale;
        } else {
          this.createNewSetting();
        }
      },
      () => this.createNewSetting.bind(this)
    );
  }

  createNewSetting() {
    this.headerDB.updateSettings(this.savedSettings);
  }

  toggleTemperatureScale(scale: string) {
    this.settings.temperatureScale = scale;
    this.savedSettings.temperatureScale = scale;
    this.headerDB.updateSettings(this.savedSettings);
  }

  setNewNameToTitle(): void {
    this.title = this.getRandomTitle();
  }

  getRandomTitle(): string {
    return this.titles[Math.floor(Math.random() * this.titles.length)];
  }

  toggleMenu() {
    this.isActive = !this.isActive;
  }
}
