import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { AuthService } from './auth.service';

const HTTP_UNAUTHENTICATED_STATUS = 401;
const HTTP_UNAUTHORIZED_STATUS = 403;

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => throwError(this.handleError(error)))
    );
  }

  private handleError(error: HttpErrorResponse): Error[] {
    if (error.status === HTTP_UNAUTHENTICATED_STATUS) {
      this.authService.signOut();

      return;
    }

    if (error.status === HTTP_UNAUTHORIZED_STATUS) {
      this.authService.signOut();

      return;
    }
  }
}
