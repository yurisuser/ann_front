import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import * as env from '../../environments/environment';
import { LoginResponse } from '../models/loginResponse';
import { LoginUser } from '../models/loginUser';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private readonly accessTokenField = 'accessToken';
    private readonly refreshTokenField = 'refreshToken';

    public authState$: BehaviorSubject<LoginUser | null>;
    private jwtDecoder: JwtHelperService;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        this.jwtDecoder = new JwtHelperService();
        this.authState$ = new BehaviorSubject(null);
        this.checkAuth();
     }

    sendLoginPassword(data): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${env.backEnd.address}/auth/login`, data)
            .pipe(
                map(
                    x => {
                        this.setTokens(x.access_token, x.refresh_token);
                        const user = this.getUserFromToken(this.getAccesToken());
                        this.authState$.next(user);
                        this.router.navigate(['']);
                        return x;
                    }
                )
            );
    }

    sendRefreshToken(): Observable<LoginResponse> {
        const headers = new HttpHeaders({Authorization: `Bearer ${this.getRefreshToken()}`, 'Content-Type': 'application/json'});
        const options = { headers };
        return this.http.post<LoginResponse>(`${env.backEnd.address}/auth/refresh`, {}, options);
    }

    setTokens(accesToken: string, refreshToken: string) {
        localStorage.setItem(this.accessTokenField, accesToken);
        localStorage.setItem(this.refreshTokenField, refreshToken);
    }

    getAccesToken(): string {
        return localStorage.getItem(this.accessTokenField);
    }

    getRefreshToken(): string {
        return localStorage.getItem(this.refreshTokenField);
    }

    private getUserFromToken(token: string): LoginUser {
        return this.jwtDecoder.decodeToken(token);
    }

    checkAuth() {
        const accesToken = this.getAccesToken();
        if (!this.jwtDecoder.isTokenExpired(accesToken)) {
            this.authState$.next(this.getUserFromToken(accesToken));
        }
        const refreshToken = this.getRefreshToken();
        if (!this.jwtDecoder.isTokenExpired(refreshToken)) {
            this.sendRefreshToken().subscribe(
                x => {
                    this.setTokens(x.access_token, x.refresh_token);
                    this.authState$.next(this.getUserFromToken(x.access_token));
                }
            );
        }
        this.authState$.next(null);
    }

    logout() {
        localStorage.removeItem(this.accessTokenField);
        localStorage.removeItem(this.refreshTokenField);
        this.authState$.next(null);
    }
}
