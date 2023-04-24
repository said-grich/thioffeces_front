import {createSelector} from "@ngrx/store";
import {ClearMsg, ToastActions, ToastActionTypes} from "../actions/toastActions";

export interface ToastStat {
  SuccessMsg:any;
  ErrorMsg:any;

}

const initialState: ToastStat = {
  SuccessMsg:null,
  ErrorMsg:null,
};

export function toastReducer(
  state: ToastStat = initialState,
  action: ToastActions
): ToastStat {
  switch (action.type) {
    case ToastActionTypes.SuccessToast:
      return {
        ...state,
        SuccessMsg:action.payload
      };
    case ToastActionTypes.ErrorToast:
      return {
        ...state,
        SuccessMsg:null,
        ErrorMsg:action.payload
      };
    case ToastActionTypes.ClearMsg:
      return {
        ...state,
        SuccessMsg:null,
        ErrorMsg:null
      };

    default:
      return state;
  }
}

export const selectAppState = (state: { toast: ToastStat }) => state.toast;
export const getSuccessMsg = createSelector(
  selectAppState,
  (state: ToastStat) => state.SuccessMsg
);
export const getErrorMsg = createSelector(
  selectAppState,
  (state: ToastStat) => state.ErrorMsg
);
