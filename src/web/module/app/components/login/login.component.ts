import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Auth} from '../../auth.service';
import {MESSAGES} from '../../app.constants';
import {NotificationsService} from 'angular2-notifications';
import './login.component.scss';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public email = new FormControl('', Validators.required);
  public password = new FormControl('', Validators.required);

  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationsService,
              private auth: Auth) {

    this.auth.authEvent()
      .subscribe((event) => {
        if (event.status === 'LOGIN_FAILURE') {
          this.notificationService.error(MESSAGES.LOGIN_FAILED);
        }
      });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  onSubmit(): void {
    this.auth.login(this.email.value, this.password.value);
  }
}
