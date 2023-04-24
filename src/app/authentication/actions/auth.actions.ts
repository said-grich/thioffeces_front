import {Action} from '@ngrx/store';
import {VerifyPhoneComponent} from "../components/verify-phone/verify-phone.component";

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  LOGOUT = '[Auth] Logout',
  ClearError = '[Auth] ClearError',
  VerifyPhone = '[Auth] Verify Phone',
  VerifyPhone_SUCCESS = '[Auth] VerifyPhone SUCCESS',
  VerifyPhone_FAILURE = '[Auth] VerifyPhone FAILURE',
  SendCode = '[Auth] SendCode ',
  SendCode_FAILURE = '[Auth] SendCode FAILURE',
  SendCode_SUCCESS = '[Auth] SendCode SUCCESS',


}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;

  constructor(public payload: any) {
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: any) {
  }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;

  constructor(public payload: any) {
  }
}

export class Signup implements Action {
  readonly type = AuthActionTypes.SIGNUP;

  constructor(public payload: any) {
  }
}

export class SignupSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;

  constructor(public payload: any) {
  }
}

export class SignupFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;

  constructor(public payload: any) {
  }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class ClearError implements Action {
  readonly type = AuthActionTypes.ClearError;
}

export class VerifyPhone implements Action {
  readonly type = AuthActionTypes.VerifyPhone;

  constructor(public payload: any) {
  }
}

export class VerifyPhone_SUCCESS implements Action {
  readonly type = AuthActionTypes.VerifyPhone_SUCCESS;

  constructor(public payload: any) {
  }
}

export class VerifyPhone_FAILURE implements Action {
  readonly type = AuthActionTypes.VerifyPhone_FAILURE;

  constructor(public payload: any) {
  }
}export class SendCode implements Action {
  readonly type = AuthActionTypes.SendCode;

  constructor(public payload: any) {
  }
}export class SendCode_FAILURE implements Action {
  readonly type = AuthActionTypes.SendCode_FAILURE;

  constructor(public payload: any) {
  }
}export class SendCode_SUCCESS implements Action {
  readonly type = AuthActionTypes.SendCode_SUCCESS;

  constructor(public payload: any) {
  }
}


export type AuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Signup
  | SignupSuccess
  | SignupFailure
  | Logout
  | ClearError
  | VerifyPhone
  | VerifyPhone_SUCCESS
  | VerifyPhone_FAILURE
  | SendCode
  | SendCode_FAILURE
  | SendCode_SUCCESS
  ;
