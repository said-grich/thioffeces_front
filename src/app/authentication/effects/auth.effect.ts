import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {AuthActionTypes, Signup, SignupSuccess, SignupFailure, AuthActions} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
  ) {
  }

  signup$: Observable<AuthActions> = createEffect(() =>

    this.actions$.pipe(
      ofType<Signup>(AuthActionTypes.SIGNUP),
      switchMap((action) =>

        this.authService.signup(action.payload.user).pipe(
          map((user) => new SignupSuccess({user})),
          catchError((error) => of(new SignupFailure({error: error.message})))
        )
      )
    )
  );

}
