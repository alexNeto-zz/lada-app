import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  protected title: string;
  private titles: string[];
  private interval;


  constructor() {
    this.titles = ["Lada", "Лада", "Łada", "ლადა"];
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
