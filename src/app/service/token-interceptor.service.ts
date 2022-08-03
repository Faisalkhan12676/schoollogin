import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService);
    const tokenizedReq = this.AddTokenHeader(req, authService.getToken() || '');
    return next.handle(tokenizedReq).pipe(
      catchError((err) => {
        if (err.status === 401) {
          return this.handleRefreshToken(req, next);
        }
        return throwError(err);
      })
    );
  }

  handleRefreshToken(req: HttpRequest<any>, next: HttpHandler) {
    const authService = this.injector.get(AuthService);
    return authService.GenerateRefreshToken().pipe(
      switchMap((tokens: any) => {
        authService.saveRefreshedToken(tokens);
        return next.handle(this.AddTokenHeader(req, tokens.token));
      }),
      catchError((err) => {
        authService.logout();
        return throwError(err);
      })
    );
  }

  AddTokenHeader(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
