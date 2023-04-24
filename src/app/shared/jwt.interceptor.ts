import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse, HttpXsrfTokenExtractor, HttpClient
} from '@angular/common/http';
import {Observable, skipWhile, take, throwError} from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/services/authentication.service';
import {select, Store} from "@ngrx/store";
import * as fromAuth from "../authentication/reducers/auth.reducer";
import {getToken, getUser} from "../authentication/reducers/auth.reducer";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  // @ts-ignore
  token$ = this.store.pipe(select(getToken));


  constructor(private store: Store<fromAuth.AuthState>,
    private http: HttpClient,private authService: AuthenticationService,private tokenExtractor: HttpXsrfTokenExtractor) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token=null;
    this.token$.subscribe(
      data=>{
       token=data;

      }
    )
    req = req.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return next.handle(req);


  }




}
