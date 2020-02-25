import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as env from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private http: HttpClient,
  ) { }

  getCatalogTypes(): Observable<any> {
    return this.http.get(`${env.backEnd.address}/catalog/types`);
  }

  getCatalogElements(): Observable<any> {
    return this.http.get(`${env.backEnd.address}/catalog/elements`);
  }
}
