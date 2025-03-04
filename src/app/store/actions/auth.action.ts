import { createAction, props } from '@ngrx/store';
import { Register } from '../../../types/register';
import { Login } from '../../../types/login';

export const register=createAction('[Auth] Register',props<{ name: string; email: string; password: string; confirmPassword: string }>()
);


export const registerSuccess=createAction('[Auth] Register Success',props<{user:Register}>())


export const registerFailure=createAction('[Auth] Register Failure',props<{error:any}>())


export const login=createAction('[Auth] Login',props<{email:string,password:string}>())

export const loginSuccess=createAction('[Auth] Login Success',props<{user:Login}>())

export const loginFailure=createAction('[Auth] Login Failure',props<{error:any}>())
