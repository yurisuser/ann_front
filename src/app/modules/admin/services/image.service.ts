import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as env from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient,
  ) { }

  getListImg(): Observable<string[]> {

    return this.http.get<string[]>(`${env.backEnd.address}/files/list`);
  }

  getImg(fileName: string): Observable<any> {
    return this.http.get(this.getFullImgPath(fileName));
  }

  getFullThumbPath(fileName: string): string {
    return `${env.backEnd.address}/files/thumb/${fileName}`;
  }

  getFullImgPath(fileName: string): string {
    return `${env.backEnd.address}/files/img/${fileName}`;
  }

  sendFile(data: FormData): Observable<any> {
    return this.http.post(`${env.backEnd.address}/files/`, data);
  }

  deleteImages(arr: string[]): Observable<any> {
    const data = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {names: arr}
    };
    return this.http.delete(`${env.backEnd.address}/files/`, data);
  }
}
