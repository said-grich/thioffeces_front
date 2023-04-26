import {Action, ActionReducer, ActionReducerMap, MetaReducer, StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer, AuthState } from '../authentication/reducers/auth.reducer';
import { AuthActions } from '../authentication/actions/auth.actions';
import {AuthEffects} from "../authentication/effects/auth.effect";
import {localStorageSync} from "ngrx-store-localstorage";
import {toastReducer, ToastStat} from "../reducers/toastReducer";

export interface AppState {

  auth: AuthState,
  toast:ToastStat

}

export const reducers: ActionReducerMap<AppState,any> = {

  auth: authReducer,
  toast:toastReducer

};


export const metaReducers: MetaReducer<AppState>[] = [
  localStorageSyncReducer,
];

export function localStorageSyncReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return localStorageSync({ keys: ['auth','toast'], rehydrate: true })(reducer);
}

export const effects = [
  AuthEffects,
];

export const store = StoreModule.forRoot(reducers, {metaReducers});

export const effectsModule = EffectsModule.forRoot(effects);
