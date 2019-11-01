import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  public verifyExist(param): Observable<number | boolean> {
    console.log('send: ', param);
    return this.http.post<any>(`${env.backEnd.address}/user/check`, param);
  }
}
