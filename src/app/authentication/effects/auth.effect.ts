import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of, tap, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {
  AuthActionTypes,
  Signup,
  SignupSuccess,
  SignupFailure,
  AuthActions,
  LoginFailure, LoginSuccess
} from '../actions/auth.actions';
import {Router} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router
  ) {
  }



  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Signup>(AuthActionTypes.SIGNUP),
      switchMap((action) =>
        this.authService.signup(action.payload).pipe(
          map( (response: any)  => {
            console.log(response["status"] == "201")
            if (response["status"] == "201") {
              return new SignupSuccess({ user: response.body });
            } else {
              return new SignupFailure({ error: ""  });
            }
          }),
          catchError((error) => {
            let errorMsg:string[]|unknown[] =[ 'An unknown error occurred.'];
            if (error.error) {
              errorMsg = Object.values(error.error).flat();
            }
            console.error(errorMsg);
            return of(new SignupFailure({ error: errorMsg }));
          })
        )
      )
    )
  );

  signupSuccess$: Observable<AuthActions> = createEffect(() =>
    this.actions$.pipe(
      ofType<SignupSuccess>(AuthActionTypes.SIGNUP_SUCCESS),
      tap(() => {
        this.router.navigate(['/log-in']);
      })
    ), { dispatch: false }
  );


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Signup>(AuthActionTypes.LOGIN),
      switchMap((action) =>
        this.authService.login(action.payload).pipe(
          map( (response: any)  => {
              return new LoginSuccess(response);

          }),
          catchError((error) => {
            let errorMsg:string[]|unknown[] =[ 'An unknown error occurred.'];
            if (error.error) {
              errorMsg = Object.values(error.error).flat();
            }
            console.error(errorMsg);
            return of(new LoginFailure({ error: errorMsg }));
          })
        )
      )
    )
  );

  loginSuccess$: Observable<AuthActions> = createEffect(() =>
    this.actions$.pipe(
      ofType<SignupSuccess>(AuthActionTypes.LOGIN_SUCCESS),
      tap((action) => {

        this.authService.setAuthToken(action.payload["access_token"]);
        this.router.navigate(['/']);
      })
    ), { dispatch: false }
  );

}
