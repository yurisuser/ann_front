import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


    constructor(
        private authSrv: AuthService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authSrv.getAccesToken();
        if (req.headers.has('authorization')) {
            return next.handle(req);
        }
        return next.handle(this.addHeader(req, token))
        .pipe(
            catchError(() => {
                return this.authSrv.getValidTokens().pipe(
                    switchMap(x => {
                        return next.handle(this.addHeader(req, x.access_token));
                    }),
                );
            })
        );
    }

    addHeader(req: HttpRequest<any>, token: string) {
        const r = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return r;
    }
}
