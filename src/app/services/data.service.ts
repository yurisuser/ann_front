import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as env from '../../environments/environment';
import { ICatalogTypes } from '../modules/admin/models/catalogTypes';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  getCatalogSubMenu(): Observable<ICatalogTypes[]> {
    return this.http.get<ICatalogTypes[]>(`${env.backEnd.address}/catalog/types`);
  }
}
