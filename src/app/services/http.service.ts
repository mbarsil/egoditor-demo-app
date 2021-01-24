import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { throwError } from 'rxjs';

import { BACKEND_HOST } from '../shared/constants/shared.constant';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  async getData<T>(entity: string): Promise<T> {
    try {
      return await this.http.get<T>(`${BACKEND_HOST}${entity}`).toPromise();
    } catch (e) {
      throwError(e);
    }
  }
}
