import { inject } from "@angular/core";
import { Action } from "rxjs/internal/scheduler/Action";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.action';
import { register } from '../actions/auth.action';
import { catchError, map, mergeMap, of } from "rxjs";
export class AuthEffects{


  actions$=inject(Actions)
  authService=inject(AuthenticationService)
  router=inject(Router)

  register$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap((action) => this.authService.register(action.name, action.email, action.password, action.confirmPassword).pipe(
        mergeMap((response) => {
          this.router.navigateByUrl('/login').then(()=>{
            location.reload()
          })
          return [AuthActions.registerSuccess({ user: response.data })]; }
        ),
        catchError(error => [AuthActions.registerFailure({ error })])
      )
      )
    );
  })

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          mergeMap((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', response.data.token);
            if(localStorage.getItem('token') != null && localStorage.getItem('user') != null){
              this.router.navigateByUrl('/').then(() => {
                location.reload();})
              }
            return of(AuthActions.loginSuccess({ user: response.data }));
          }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );


  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        map(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );


}
