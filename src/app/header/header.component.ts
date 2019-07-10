import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public title: string;
  private titles: string[];
  private interval;


  constructor() {
    this.titles = ['Lada', 'Лада', 'Łada', 'ლადა'];
  }

  ngOnInit() {
    this.setNewNameToTitle();
    this.interval = setInterval(() => {
      this.setNewNameToTitle();
    }, 2000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  setNewNameToTitle(): void {
    this.title = this.getRandomTitle();
  }

  getRandomTitle(): string {
    return this.titles[Math.floor(Math.random() * this.titles.length)];
  }
}
