import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as env from '../../environments/environment';
import { ICatalogType } from '../models/catalogType';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  getCatalogSubMenu(): Observable<ICatalogType[]> {
    return this.http.get<ICatalogType[]>(`${env.backEnd.address}/catalog/types`);
  }
}
