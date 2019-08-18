import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  @Input()
  public sourceQuantity = 0;

  onForecast(sourceQuantity: number) {
    this.sourceQuantity = sourceQuantity;
  }
}
