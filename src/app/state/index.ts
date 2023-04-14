import {Action, ActionReducerMap, StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer, AuthState } from '../authentication/reducers/auth.reducer';
import { AuthActions } from '../authentication/actions/auth.actions';
import {AuthEffects} from "../authentication/effects/auth.effect";

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState,any> = {
  auth: authReducer,
};

export const effects = [
  AuthEffects,
];

export const store = StoreModule.forRoot(reducers, {});
export const effectsModule = EffectsModule.forRoot(effects);
