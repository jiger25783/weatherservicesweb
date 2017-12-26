import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {Http, HttpModule, RequestOptions} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {NavigationComponent} from './shared/components/navigation/navigation.component';
import {HomeComponent} from './components/home/home.component';
import {WeatherComponent} from './components/weather/weather.component';
import {ConfirmWarningModalComponent} from './shared/components/confirm-warning-modal/confirm-warning-modal.component';
import {IndexComponent} from './components/index/index.component';
import {LoginComponent} from './components/login/login.component';
import {AUTH_PROVIDERS, AuthConfig, AuthHttp} from 'angular2-jwt';
import {AuthGuard} from './shared/services/auth.guard';
import {Auth} from './auth.service';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {Ng2FilterPipeModule} from 'ng2-filter-pipe';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

function authHttpServiceFactory(http: Http, options: RequestOptions): Object {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
  }), http, options);
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    Ng2FilterPipeModule,
    SimpleNotificationsModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: IndexComponent},
      {path: 'login', component: LoginComponent},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'weather', component: WeatherComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: ''},
    ], {}),
    NgbModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    ConfirmWarningModalComponent,
    WeatherComponent,
    HomeComponent,
    IndexComponent,
    LoginComponent,
    NavigationComponent,
    SidebarComponent,
  ],
  providers: [
    Auth,
    AuthGuard,
    {
      deps: [Http, RequestOptions],
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
    },
    ...AUTH_PROVIDERS],
  entryComponents: [
    ConfirmWarningModalComponent,
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
