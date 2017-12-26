import {Component} from '@angular/core';
import {Auth} from './auth.service';
import './app.component.scss';
import {Router} from '@angular/router';

@Component({
  selector: 'sample-app',
  providers: [Auth],
  templateUrl: './app.component.html',
})

export class AppComponent {
  public notificationOptions = {
    timeOut: 2500,
  };

  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.isActive('login', true);
  }
}
