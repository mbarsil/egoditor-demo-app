import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.authService.isAuthenticated()) {
      return next.handle(req);
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.currentUser.token}`
    });

    req = req.clone({ headers });

    return next.handle(req);
  }
}
