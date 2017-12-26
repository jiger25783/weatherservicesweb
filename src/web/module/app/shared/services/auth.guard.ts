import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Auth} from '../../auth.service';

/**
 * AuthGuard is a simple service that provides a method that
 * returns whether or not a specific route in the router is
 * accessible when it is activated. In the instance when a
 * route is not allowed (i.e. a valid JWT is not available),
 * then the client is routed to the login page.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  /**
   * Returns whether or not a route is accessible ever time
   * a route is activated. If the client is not in possession
   * of a valid JWT, then reroute to the login page.
   * @param {ActivatedRouteSnapshot} next
   * @param {RouterStateSnapshot} state
   * @return {boolean}
   */
  public canActivate(next: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
