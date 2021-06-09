import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getCatalogPages(): Observable<any> {
    return this.http.get(`${env.backEnd.address}/catalog/page`);
  }

  getGaleryTypes(): Observable<any> {
    return this.http.get(`${env.backEnd.address}/galery/types`);
  }

  getGaleryElements(): Observable<any> {
    return this.http.get(`${env.backEnd.address}/galery/elements`);
  }

  updateCatalogType(type): Observable<any> {
    return this.http.post(`${env.backEnd.address}/catalog/type`, type);
  }

  updateCatalogElement(type): Observable<any> {
    return this.http.post(`${env.backEnd.address}/catalog/element`, type);
  }

  updateCatalogPage(page): Observable<any> {
    return this.http.post(`${env.backEnd.address}/catalog/page`, page);
  }

  updateGaleryType(type): Observable<any> {
    return this.http.post(`${env.backEnd.address}/galery/type`, type);
  }

  updateGaleryElement(type): Observable<any> {
    return this.http.post(`${env.backEnd.address}/galery/element`, type);
  }

  createCatalogtype(type): Observable<any> {
    return this.http.put(`${env.backEnd.address}/catalog/type`, type);
  }

  createCatalogElement(element): Observable<any> {
    return this.http.put(`${env.backEnd.address}/catalog/element`, element);
  }

  createCatalogPage(page): Observable<any> {
    return this.http.put(`${env.backEnd.address}/catalog/page`, page);
  }

  createGaleryType(type): Observable<any> {
    return this.http.put(`${env.backEnd.address}/galery/type`, type);
  }

  createGaleryElement(element): Observable<any> {
    return this.http.put(`${env.backEnd.address}/galery/element`, element);
  }

  deleteCatalogElement(id) {
    const data = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {id}
    };
    return this.http.delete(`${env.backEnd.address}/catalog/element`, data);
  }

  deleteCatalogType(id) {
    const data = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {id}
    };
    return this.http.delete(`${env.backEnd.address}/catalog/type`, data);
  }

  deleteCatalogPage(id) {
    const data = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {id}
    };
    return this.http.delete(`${env.backEnd.address}/catalog/page`, data);
  }

  deleteGaleryElement(id) {
    const data = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {id}
    };
    return this.http.delete(`${env.backEnd.address}/galery/element`, data);
  }

  deleteGaleryType(id) {
    const data = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {id}
    };
    return this.http.delete(`${env.backEnd.address}/galery/type`, data);
  }
}
