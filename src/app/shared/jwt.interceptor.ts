import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    let authRequest = request;

    const token = this.authService.getAuthToken();
    if (token) {
      authRequest = this.addToken(request, token);
    }

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error?.code === 'token_not_valid') {
          return this.authService.refreshToken().pipe(
            switchMap((response: any) => {
              this.authService.setAuthToken(response.access);
              authRequest = this.addToken(request, response.access);
              return next.handle(authRequest);
            }),
            catchError((error: HttpErrorResponse) => {
              this.authService.logout();
              return throwError(error);
            })
          );
        }
        return throwError(error);
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
