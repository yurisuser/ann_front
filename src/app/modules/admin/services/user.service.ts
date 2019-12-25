import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import * as env from '../../../../environments/environment';
import { IRole } from '../models/role';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  public getRoles(): Observable<any> {
    return this.http.get<IRole>(`${env.backEnd.address}/role`);
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${env.backEnd.address}/user`);
  }

  public createUser(user): Observable<any> {
    const {confirm, ...data} = user;
    return this.http.put<any>(`${env.backEnd.address}/user`, data);
  }


  public updateUser(user): Observable<any> {
    return of(null)
  }

  public verifyExist(param): Observable<number | boolean> {
    return this.http.post<any>(`${env.backEnd.address}/user/check`, param);
  }

  public deleteUsers(arr: number[]) {
    console.log(arr);

    const data = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: {ids: arr}
    };
    return this.http.delete<any>(`${env.backEnd.address}/user`, data);
  }
}
