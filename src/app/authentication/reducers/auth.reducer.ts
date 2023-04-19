import {AuthActions, AuthActionTypes} from '../actions/auth.actions';
import {User} from "../models/user_model";
import {createSelector} from "@ngrx/store";

export interface AuthState {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  user: User | null
  is_phone_verified:boolean;
  is_active:boolean;
}

const initialState: AuthState = {
  loading: false,
  error: "",
  isAuthenticated: false,
  user: null,
  is_phone_verified:false,
  is_active:false
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.SIGNUP:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case AuthActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isAuthenticated: false,
      };
    case AuthActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload["error"],
      };
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,

        isAuthenticated:true,
        loading: false,
        error: null,
        is_phone_verified:action.payload["is_phone_verified"],
        is_active:action.payload["is_active"],
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload["error"],
      };
    default:
      return state;
  }
}

export const selectAuthState = (state: { auth: AuthState }) => state.auth;
export const getError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
export const getLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const getIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);
export const getIsPhoneVerified = createSelector(
  selectAuthState,
  (state) => state.is_phone_verified
);
export const getIsActive = createSelector(
  selectAuthState,
  (state) => state.is_active
);
