import { AuthActions, AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  loading: boolean;
  error: string ;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  loading: false,
  error: "",
  isAuthenticated: false,
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
        error: "",
        isAuthenticated: true,
      };
    case AuthActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload["error"],
      };
    default:
      return state;
  }
}
