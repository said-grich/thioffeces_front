import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of, take, tap, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {
  AuthActionTypes,
  Signup,
  SignupSuccess,
  SignupFailure,
  AuthActions,
  LoginFailure,
  LoginSuccess,
  VerifyPhone_SUCCESS,
  VerifyPhone_FAILURE,
  SendCode_SUCCESS,
  SendCode_FAILURE,
  Login,
  SendCode, VerifyPhone, ReSendCode, ReSendCode_SUCCESS, ReSendCode_FAILURE
} from '../actions/auth.actions';
import {NavigationExtras, Router} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ToastService} from "../../shared/toast.service";
import {getContentOfKeyLiteral} from "@angular-material-extensions/select-country/schematics/helpers";
import {select, Store} from "@ngrx/store";
import {getIsAuthenticated, getIsPhoneVerified, getLoading} from "../reducers/auth.reducer";
import * as fromAuth from "../reducers/auth.reducer";
// @ts-ignore
import moment from 'moment';
import {ErrorToast, SuccessToast} from "../../actions/toastActions";
import {AppState} from "../../state";

@Injectable()
export class AuthEffects {
  // @ts-ignore
  isLoading$ = this.store.pipe(select(getLoading));
  // @ts-ignore

  isAuthenticated = this.store.pipe(select(getIsAuthenticated));
  // @ts-ignore
  isPhoneVerified = this.store.pipe(select(getIsPhoneVerified));

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private authService: AuthenticationService,
    private router: Router,
  ) {
  }


  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Signup>(AuthActionTypes.SIGNUP),
      switchMap((action) =>
        this.authService.signup(action.payload).pipe(
          map((response: any) => {
            console.log(response["status"] == "201")
            if (response["status"] == "201") {
              return new SignupSuccess({user: response.body});
            } else {
              return new SignupFailure({error: ""});
            }
          }),
          catchError((error) => {
            let errorMsg: string[] | unknown[] = ['An unknown error occurred.'];
            if (error.error) {
              errorMsg = Object.values(error.error).flat();
            }
            console.error(errorMsg);
            return of(new SignupFailure({error: errorMsg}));
          })
        )
      )
    )
  );

  signupSuccess$: Observable<AuthActions> = createEffect(() =>
    this.actions$.pipe(
      ofType<SignupSuccess>(AuthActionTypes.SIGNUP_SUCCESS),
      tap(() => {
        this.store.dispatch(new SuccessToast({
          "title": "SingUp Successful",
          "body": "Thank you for signing up. Please login and confirm your phone number to activate your account."
        }));
        this.router.navigate(['/login']);
      })
    ), {dispatch: false}
  );


  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Login>(AuthActionTypes.LOGIN),
      switchMap((action) => {
          return this.authService.login(action.payload).pipe(
            map((response: any) => {
              return new LoginSuccess(response);
            }),
            catchError((error) => {
              let errorMsg: string[] | unknown[] = ['An unknown error occurred.'];
              if (error.error) {
                errorMsg = Object.values(error.error).flat();
              }
              console.error(errorMsg);
              return of(new LoginFailure({error: errorMsg}));
            })
          )

        }
      )
    )
  );

  loginSuccess$: Observable<AuthActions> = createEffect(() =>
    this.actions$.pipe(
      ofType<LoginSuccess>(AuthActionTypes.LOGIN_SUCCESS),
      tap((action) => {

        this.store.dispatch(new SuccessToast({
          "title": "Login Successful",
          "body": "Welcome back! You have successfully logged in."
        }));
        this.isPhoneVerified.subscribe(
          isPhoneVerified => {
            if (!isPhoneVerified) {
              this.router.navigate(['/send-code']);
            } else {
              this.router.navigate(['/']);
            }
          }
        )

      })
    ), {dispatch: false}
  );


  sendCode = createEffect(() =>
    this.actions$.pipe(
      ofType<SendCode>(AuthActionTypes.SendCode),
      switchMap((action) =>
        this.authService.sendCode(action.payload).pipe(
          map((response: any) => {

            return new SendCode_SUCCESS(response);
          }),
          catchError((error) => {
            console.error(error)
            let errorMsg: string[] | unknown[] = ['An unknown error occurred.'];
            if (error.error) {
              errorMsg = Object.values(error.error).flat();
            }
            console.log(errorMsg);
            return of(new SendCode_FAILURE({error: errorMsg}));
          })
        )
      )
    )
  );

  SendCodeSuccess$: Observable<AuthActions> = createEffect(() =>
    this.actions$.pipe(
      ofType<SendCode_SUCCESS>(AuthActionTypes.SendCode_SUCCESS),
      tap((action) => {
        this.store.dispatch(new SuccessToast({
          "title": "Verification Code Send Successful",
          "body": "Verification Code Send Successful"
        }));


        this.router.navigate(['/verify-phone'])


      })
    ), {dispatch: false}
  );


  verifyPhone$ = createEffect(() =>
    this.actions$.pipe(
      ofType<VerifyPhone>(AuthActionTypes.VerifyPhone),
      switchMap((action) =>
        this.authService.verifyPhone(action.payload).pipe(
          map((response: any) => {
            return new VerifyPhone_SUCCESS(response);
          }),
          catchError((error) => {
            console.error(error)
            let errorMsg: string[] | unknown[] = ['An unknown error occurred.'];
            if (error.error) {
              errorMsg = Object.values(error.error).flat();
            }
            console.log(errorMsg);
            return of(new VerifyPhone_FAILURE({error: errorMsg}));
          })
        )
      )
    )
  );
  VerifyPhoneSUCCESS$: Observable<AuthActions> = createEffect(() =>
    this.actions$.pipe(
      ofType<VerifyPhone_SUCCESS>(AuthActionTypes.VerifyPhone_SUCCESS),
      tap((action) => {
        console.log("Pay", action.payload)
        if (action.payload["success"] == true) {
          this.store.dispatch(new SuccessToast({
            "title": "Phone Verified With Success",
            "body": "Phone Verified With Success"
          }));
          this.router.navigate(["/"])
        }
      })
    ), {dispatch: false}
  );

  reSendCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType<ReSendCode>(AuthActionTypes.ReSendCode),
      switchMap((action) =>
        this.authService.resendCode(action.payload).pipe(
          map((response: any) => {
            return new ReSendCode_SUCCESS(response);
          }),
          catchError((error) => {
            console.error(error)
            let errorMsg: string[] | unknown[] = ['An unknown error occurred.'];
            if (error.error) {
              errorMsg = Object.values(error.error).flat();
            }
            return of(new ReSendCode_FAILURE({error: errorMsg}));
          })
        )
      )
    )
  );
  resendCodeSUCCESS$: Observable<AuthActions> = createEffect(() =>
    this.actions$.pipe(
      ofType<ReSendCode_SUCCESS>(AuthActionTypes.ReSendCode_SUCCESS),
      tap((action) => {
        if (action.payload["success"] == true) {
          this.store.dispatch(new SuccessToast({
            "title": "Phone Verified With Success",
            "body": action.payload["msg"]
          }));
        }
      })
    ), {dispatch: false}
  );


}
