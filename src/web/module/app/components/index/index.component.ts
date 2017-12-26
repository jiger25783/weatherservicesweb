import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Auth} from '../../auth.service';

@Component({
  selector: 'login',
  templateUrl: './index.component.html',
})

export class IndexComponent implements OnInit {
  constructor(private auth: Auth,
              private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigateByUrl('home');
  }
}
