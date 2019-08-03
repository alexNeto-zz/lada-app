import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tool-panel',
  templateUrl: './tool-panel.component.html',
  styleUrls: ['./tool-panel.component.scss']
})
export class ToolPanelComponent implements OnInit {

  @Input()
  public sourceQuantity: Number = 0;
  constructor() { }

  ngOnInit() {
  }

}
