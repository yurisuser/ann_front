import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as env from '../../environments/environment';
import { ICatalogTypes } from '../models/catalogTypes';
import { ICatalogElement } from '../models/catalogElements';


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

  getCatalogElements() {
    return this.http.get<ICatalogElement[]>(`${env.backEnd.address}/catalog/elements`);
  }

  getFullImgPath(img: string) {
    return `${env.backEnd.address}/files/img/${img}`
  }
}
