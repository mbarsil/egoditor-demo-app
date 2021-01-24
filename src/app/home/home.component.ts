import { Component, OnInit } from '@angular/core';

import { HttpService } from '../services/http.service';
import { AuthService } from '../services/auth.service';

import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(
    private authService: AuthService,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    // this.httpService.
  }

  signOut(): void {
    this.authService.signOut();
  }
}
