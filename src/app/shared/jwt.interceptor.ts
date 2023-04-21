import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse, HttpXsrfTokenExtractor, HttpClient
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private token: string | undefined;
  csrfToken:any
  constructor(private http: HttpClient,private authService: AuthenticationService,private tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = this.authService.getAuthToken();
    const refreshToken = this.authService.getRefreshToken();

    if (idToken) {

      let cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!req.headers.has('X-CSRF-TOKEN')) {
        cloned = cloned.clone({ headers: req.headers.set('X-CSRF-TOKEN', this.tokenExtractor.getToken() || '') });
      }

      return next.handle(cloned).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401 && refreshToken) {
            return this.authService.refreshToken().pipe(
              switchMap((response) => {
                // @ts-ignore
                const newIdToken = response["access_token"];
                // @ts-ignore
                const newRefreshToken = response["refresh_token"];
                this.authService.setAuthToken(newIdToken);
                const clonedWithNewToken = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newIdToken}`,
                  },
                });
                return next.handle(clonedWithNewToken);
              }),
              catchError((error) => {
                this.authService.logout();
                return throwError(error);
              })
            );
          } else {
            return throwError(error);
          }
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
