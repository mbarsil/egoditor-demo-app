import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  async getData<T>(entity: string): Promise<T> {
    try {
      return await this.http.get<T>(`${environment.backendHost}${entity}`).toPromise();
    } catch (e) {
      throwError(e);
    }
  }
}
