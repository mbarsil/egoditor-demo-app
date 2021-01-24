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
  homeContent: string;

  constructor(
    private authService: AuthService,
    private httpService: HttpService
  ) { }

  async ngOnInit(): Promise<void> {
    this.currentUser = this.authService.currentUser;

    this.homeContent = await this.httpService.getData<string>('home');
  }

  signOut(): void {
    this.authService.signOut();
  }
}
