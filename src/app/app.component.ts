import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Input()
  public sourceQuantity = 0;

  onForecast(sourceQuantity: number) {
    this.sourceQuantity = sourceQuantity;
  }
}

