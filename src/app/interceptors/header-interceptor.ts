import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.url.includes('files')) {
            return next.handle(req); // disable for Multer at back case loading image
        }
        const r = req.clone({setHeaders: {'Content-Type': 'application/json'}});
        return next.handle(r);
    }
}
