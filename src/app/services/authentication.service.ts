import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { APIResponse } from '../../types/api_response';
import { Register } from '../../types/register';
import { Login } from '../../types/login';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  http=inject(HttpClient)

  constructor() { }


  register(name:string,email:string,password:string,confirmPassword:string):Observable<APIResponse<Register>>{
    return this.http.post<APIResponse<Register>>('http://localhost:3000/api/auth/register', {name, email, password, confirmPassword}).pipe(
      catchError((err) => {
        alert(err.message);
        return throwError(() => new Error(err.message || 'Registration failed'));
        throw err;
      })
    )
  }

  login(email:string, password:string):Observable<APIResponse<Login>>{
    return this.http.post<APIResponse<Login>>('http://localhost:3000/api/auth/login', {email, password})
  }


  get userName(){
    let userData=localStorage.getItem('user')
    if(userData){
      return JSON.parse(userData).name
    }
    return null
  }

  get isLoggedIn(){
    let token=localStorage.getItem('token')
    if(token){
      return true
    }
    return false
  }

  get isAdmin(){
    let userData=localStorage.getItem('user')
    if(userData){
      return JSON.parse(userData).isAdmin
    }
    return false
  }

  get userEmail(){
    let userData=localStorage.getItem('user')
    if(userData){
      return JSON.parse(userData).email
    }
    return null
  }

}
