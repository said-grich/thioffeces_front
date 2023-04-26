import {AuthActions, AuthActionTypes} from '../actions/auth.actions';
import {User} from "../models/user_model";
import {createSelector} from "@ngrx/store";
import {flagSet} from "@coreui/icons";
import {Group} from "../models/group-model";

export interface AuthState {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  user: User | null
  is_phone_verified: boolean;
  is_active: boolean;
  token: string | null;
  refresh_token: string | null;
  group:Group|null
  permissions:Permissions[]
}

const initialState: AuthState = {
  loading: false,
  error: "",
  isAuthenticated: false,
  user: null,
  is_phone_verified: false,
  is_active: false,
  token: null,
  refresh_token: null,
  group:null,
  permissions:[]
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
        isAuthenticated: true,
        loading: false,
        error: null,
        is_phone_verified: action.payload["is_phone_verified"],
        is_active: action.payload["is_active"],
        token: action.payload["access_token"],
        refresh_token: action.payload["refresh_token"],
        user: action.payload["user"],
        group:action.payload["group"],
        permissions:action.payload["permissions"]
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload["error"],
      };
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: null,
        is_phone_verified: false,
        is_active: false,
        token: null,
        refresh_token: null,
        group: null

      };
    case AuthActionTypes.ClearError:
      return {
        ...state,
        error: null,
      };
    case AuthActionTypes.VerifyPhone:
      return {
        ...state,
        loading: true,
      };
    case AuthActionTypes.VerifyPhone_SUCCESS:
      return {
        ...state,
        loading: false,
        is_phone_verified: true,
        error: null,
      };
    case AuthActionTypes.VerifyPhone_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload["error"],
      };
    case AuthActionTypes.SendCode:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AuthActionTypes.SendCode_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case AuthActionTypes.SendCode_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload["error"],
      };

    case AuthActionTypes.ReSendCode:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AuthActionTypes.ReSendCode_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case AuthActionTypes.ReSendCode_FAILURE:
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
export const getUser = createSelector(
  selectAuthState,
  (state) => state.user
);
export const getToken = createSelector(
  selectAuthState,
  (state) => state.token
);
export const getGroup = createSelector(
  selectAuthState,
  (state) => state.group
);
export const getPermissions = createSelector(
  selectAuthState,
  (state) => state.group
);
