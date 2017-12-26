import {Injectable} from '@angular/core';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';

/**
 * This service provides function to check whether or not
 * the client is logged-in and to facilitate the log-in
 * process.
 */
@Injectable()
export class Auth {
  /**
   * JWT utility provider.
   * @type {JwtHelper}
   */
  jwtHelper: JwtHelper = new JwtHelper();

  httpOptions = new RequestOptions({
    headers: new Headers({'Content-Type': 'application/json'}),
  });

  /**
   * Returns an observable that can be watched for authentication
   * events (i.e. a failed log-in attempt, etc).
   * @type {Subject<any>}
   */
  private authEventSubject = new Subject<any>();

  constructor(private router: Router, private http: Http) {}

  /**
   * Sends the credentials to the authentication endpoint.
   * @param {string} email
   * @param {string} password
   * @return {Observable}
   */
  login(email: string, password: string): Subscription {
    return this.http.post('/api/login', {email, password}, this.httpOptions)
      .map((res: Response) => res.text())
      .catch((error) => {
        if (error.status === 401) {
          this.authEventSubject.next({status: 'LOGIN_FAILURE'});
        }
        return Observable.throw(error || 'Server error');
      })
      .subscribe((token: string) => {
        if (token) {
          localStorage.setItem('token', token);
          this.authEventSubject.next({status: 'LOGIN_SUCCESS'});
          this.router.navigateByUrl('home');
        }
      });
  }

  /**
   * Returns an observable that can be watched for authentication
   * events.
   * @return {Observable<any>}
   */
  authEvent(): Observable<any> {
    return this.authEventSubject.asObservable();
  }

  /**
   * Returns the profile portion of a JWT from the local storage
   * and decodes it back into a simple JSON object.
   * @return {Object}
   */
  getProfile(): Object {
    let token = localStorage.getItem('token');
    if (token) {
      return this.jwtHelper
        .decodeToken(token)
        .data;
    } else {
      return {};
    }
  }

  /**
   * Returns whether or not a token is expired.
   * @return {boolean}
   */
  isAuthenticated(): boolean {
    return tokenNotExpired('token');
  }

  /**
   * Logs-out the client by deleting it's token.
   */
  logout(): void {
    localStorage.removeItem('token');
  }
}
