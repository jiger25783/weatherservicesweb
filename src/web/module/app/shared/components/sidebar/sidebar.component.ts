import {Component, Input} from '@angular/core';
import './sidebar.component.scss';

@Component({
  selector: 'sample-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent {
  @Input() isVisible: boolean;

  constructor() {}
}
