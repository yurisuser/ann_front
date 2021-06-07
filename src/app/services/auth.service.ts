import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
        const headers = new HttpHeaders({authorization: `Bearer ${this.getRefreshToken()}`});
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

    removeAccesToken() {
        localStorage.removeItem(this.accessTokenField);
    }

    removeRefreshToken() {
        localStorage.removeItem(this.refreshTokenField);
    }

    private getUserFromToken(token: string): LoginUser {
        return this.jwtDecoder.decodeToken(token);
    }

    checkExpire(token): boolean {
        return this.jwtDecoder.isTokenExpired(token);
    }

    startCheckAuth() {
        const accesToken = this.getAccesToken();
        const refreshToken = this.getRefreshToken();
        console.log('acc', this.checkExpire(accesToken));
        console.log('ref', this.checkExpire(refreshToken));
        if (this.checkExpire(refreshToken)) {
            this.redirectToLoginPage();
            this.authState$.next(null);
            return;
        }
        if (this.checkExpire(accesToken)) {
            this.sendRefreshToken().subscribe(
                x => {
                    this.setTokens(x.access_token, x.refresh_token);
                    this.authState$.next(this.getUserFromToken(x.access_token));
                }
            );
        } else {
            this.authState$.next(this.getUserFromToken(this.getAccesToken()));
        }
    }

    getValidTokens(): Observable<{access_token: string, refresh_token: string}> {
        return new Observable(sub => {
            const accessToken = this.getAccesToken();
            const refreshToken = this.getRefreshToken();
            if (this.checkExpire(refreshToken)) {
                this.redirectToLoginPage();
            }
            if (this.checkExpire(accessToken)) {
                this.sendRefreshToken()
                    .subscribe(x => {
                        this.setTokens(x.access_token, x.refresh_token);
                        this.authState$.next(this.getUserFromToken(x.access_token));
                        sub.next(x);
                    },
                    err => {
                        this.redirectToLoginPage();
                    }
                    );
                return;
            }

            sub.next({
                access_token: accessToken,
                refresh_token: refreshToken
            });
        });
    }

    refreshTokens(): Observable<any> {
        return this.sendRefreshToken().pipe(
            tap(
                x => {
                    this.setTokens(x.access_token, x.refresh_token);
                    this.authState$.next(this.getUserFromToken(x.access_token));
                }
            ),
        );
    }

    logout() {
        localStorage.removeItem(this.accessTokenField);
        localStorage.removeItem(this.refreshTokenField);
        this.authState$.next(null);
    }

    public redirectToLoginPage() {
        this.authState$.next(null);
        this.removeAccesToken();
        this.removeRefreshToken();
        // this.router.navigate(['auth']);
    }
}
