import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private stemTitle: string;
  private divider: string;

  constructor(private title: Title) {
    this.stemTitle = 'Lada-app';
    this.divider = ' | ';
  }

  appendToTitle(subtitle: string) {
    this.title.setTitle(this.stemTitle + this.divider + subtitle);
  }

  setStemTitle() {
    this.title.setTitle(this.stemTitle);
  }
}
