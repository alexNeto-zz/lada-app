import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private stemTitle: string;
  private divider: string;

  constructor(private title: Title) {
    this.stemTitle = 'lada-app';
    this.divider = ' | ';
  }

  appendToTitle(subtitle: string) {
    this.title.setTitle(this.stemTitle + this.divider + subtitle);
  }

  setStemTitle() {
    this.title.setTitle(this.stemTitle);
  }
}
