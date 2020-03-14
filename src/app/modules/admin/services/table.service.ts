import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import * as env from '../../../../environments/environment';
import { ICatalogElement } from '../models/catalogElements';

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

  updateCatalogType(type): Observable<any> {
    return this.http.post(`${env.backEnd.address}/catalog/type`, type);
  }

  updateCatalogElement(type): Observable<any> {
    return this.http.post(`${env.backEnd.address}/catalog/element`, type);
  }

  createCatalogtype(type): Observable<any> {
    return this.http.put(`${env.backEnd.address}/catalog/type`, type);
  }

  createCatalogElement(element): Observable<any> {
    return this.http.put(`${env.backEnd.address}/catalog/element`, element);
  }

  deleteCatalogElement(id) {
    const data = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {id}
    };
    return this.http.delete(`${env.backEnd.address}/catalog/element`, data);
  }

  deleteCatalogType(id) {
    console.log(id);

    const data = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {id}
    };
    return this.http.delete(`${env.backEnd.address}/catalog/type`, data);
  }
}
