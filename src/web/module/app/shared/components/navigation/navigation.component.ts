import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Auth} from '../../../auth.service';
import {Subscription} from 'rxjs/Subscription';
import './navigation.component.scss';

@Component({
  selector: 'sample-navigation',
  templateUrl: './navigation.component.html',
})

export class NavigationComponent {
  profile: Object;
  authEventSubscription: Subscription;

  isNavbarCollapsed = false;

  constructor(private auth: Auth,
              private router: Router) {}

  ngOnInit(): void {
    this.profile = this.auth.getProfile();

    this.authEventSubscription =
      this.auth.authEvent().subscribe(() => {
        this.profile = this.auth.getProfile();
      });
  }

  ngOnDestroy(): void {
    this.authEventSubscription.unsubscribe();
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('login');
  }
}
