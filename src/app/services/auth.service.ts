import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserCredentials, UserToken } from '../shared/interfaces/shared.interface';
import { User } from '../shared/models/user.model';
import { BACKEND_HOST } from '../shared/constants/shared.constant';

const TOKEN_STORAGE_KEY = 'userToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser: User;

  get currentUser(): User {
    return this._currentUser;
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  isAuthenticated(): boolean {
    this._currentUser ||= JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEY));

    return !!this._currentUser;
  }

  signOut(): void {
    this._currentUser = null;

    localStorage.removeItem(TOKEN_STORAGE_KEY);
    this.router.navigateByUrl('login');
  }

  async signIn(credentials: UserCredentials): Promise<void> {
    try {
      const userToken: UserToken = (await this.http.post(`${BACKEND_HOST}auth/signin`, credentials).toPromise()) as UserToken;
      this._currentUser = new User(credentials.username, userToken.accessToken);

      this.saveTokenToStorage();
    } catch (error) {
      throw error;
    }
  }

  private saveTokenToStorage(): void {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(this._currentUser));
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(this._currentUser));
  }
}
