import { createReducer, on } from "@ngrx/store";
import { Login } from "../../../types/login";
import { Register } from "../../../types/register";
import * as AuthActions from '../actions/auth.action';
import { registerSuccess } from '../actions/auth.action';
import { state } from "@angular/animations";

export interface AuthState{
  user:Register | Login | null,
  error:any
}


export const initialState: AuthState = {
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.registerSuccess, (state, { user }) => ({ ...state, user, error: null })),
  on(AuthActions.registerFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.loginSuccess,(state, { user }) => ({ ...state, user})),
  on(AuthActions.loginFailure,(state, { error }) => ({ ...state,error})),
  on(AuthActions.logout,(state) => ({ ...state, user: null,error: null})),
);
