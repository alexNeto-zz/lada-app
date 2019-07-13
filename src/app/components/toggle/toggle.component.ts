import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  @Input() toggleId: string;
  @Input() frontText: string;
  @Input() frontIcon: string;
  @Input() backText: string;
  @Input() backIcon: string;
  @Output() isActivated: boolean;
  constructor() {
    this.isActivated = true;
  }

  ngOnInit() {
  }

}
