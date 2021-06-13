import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as env from '../../environments/environment';
import { ICatalogTypes } from '../models/catalogTypes';
import { ICatalogElement } from '../models/catalogElements';
import { IGaleryTypes } from '../models/galeryTypes';
import { IGaleryElement } from '../models/galeryElements';
import { ICatalogElementsPages } from '../models/catalogElementsPages';


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

  getCatalogElements(): Observable<ICatalogElement[]> {
    return this.http.get<ICatalogElement[]>(`${env.backEnd.address}/catalog/elements`);
  }

  getCatalogElementPages(): Observable<ICatalogElementsPages[]> {
    return this.http.get<ICatalogElementsPages[]>(`${env.backEnd.address}/catalog/page`);
  }

  getGallerySubMenu(): Observable<ICatalogTypes[]> {
    return this.http.get<IGaleryTypes[]>(`${env.backEnd.address}/galery/types`);
  }

  getGalleryElements(): Observable<IGaleryElement[]> {
    return this.http.get<IGaleryElement[]>(`${env.backEnd.address}/galery/elements`);
  }

  getFullImgPath(img: string): string {
    return `${env.backEnd.address}/files/img/${img}`;
  }
}
