import {Action} from '@ngrx/store';

export enum ToastActionTypes {
  SuccessToast = '[Toast] SuccessToast',
  ErrorToast = '[Toast] ErrorToast',
  ClearMsg = '[Toast] ClearMsg',


}

export class SuccessToast implements Action {
  readonly type = ToastActionTypes.SuccessToast;

  constructor(public payload: any) {
  }
}

export class ErrorToast implements Action {
  readonly type = ToastActionTypes.ErrorToast;

  constructor(public payload: any) {
  }
}
export class ClearMsg implements Action {
  readonly type = ToastActionTypes.ClearMsg;


}


export type ToastActions =
  | SuccessToast
  | ErrorToast
  | ClearMsg

  ;
