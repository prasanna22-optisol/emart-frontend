import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthenticationService } from '../../services/authentication.service';
import { APIResponse } from '../../../types/api_response';
import { Login } from '../../../types/login';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthError } from '../../store/selectors/auth.selector';
import * as AuthActions from "../../store/actions/auth.action"

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  formBuilder=inject(FormBuilder)
  authService=inject(AuthenticationService)
  router=inject(Router)
  route=inject(ActivatedRoute)
  store=inject(Store)

  loginForm=this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(5),Validators.required]],
  })

  // loginUser(){
  //   let value = this.loginForm.value;

  //   if (value.email && value.password) {
  //     this.authService.login(
  //       value.email, value.password
  //     ).subscribe((result:APIResponse<Login>)=>{
  //       console.log(result);
  //       // alert("Login successful")
  //       localStorage.setItem("token", result.data.token)
  //       localStorage.setItem("user", JSON.stringify(result.data.user))
  //       if(localStorage.getItem("token") != null && localStorage.getItem("user") != null){
  //         this.router.navigateByUrl("/").then(()=>{
  //           location.reload()
  //         })
  //       }

  //     });
  //   } else {
  //     // Handle the case where email or password is missing
  //     console.error('Email and password are required');
  //   }

  // }

  authError$:Observable<any>=this.store.select(selectAuthError)

  loginUser(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email as string;
      const password = this.loginForm.value.password as string;
      this.store.dispatch(AuthActions.login({email, password}))

    }
  }

}
