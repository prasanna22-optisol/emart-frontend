import { Component, inject, InjectableProvider } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../utils/PasswordValidator';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { APIResponse } from '../../../types/api_response';
import { Register } from '../../../types/register';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { selectAuthError } from '../../store/selectors/auth.selector';
import { Store } from '@ngrx/store';
import { register } from '../../store/actions/auth.action';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  authService=inject(AuthenticationService)
  store=inject(Store)


  formBuilder = inject(FormBuilder);
  registerForm : FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(5),Validators.required]],
    confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
  },{
    validator: passwordMatchValidator
  });

  router=inject(Router)

  // registerUser(){
  //   let value=this.registerForm.value;
  //   this.authService.register(
  //     value!.name,
  //     value!.email,
  //     value!.password,
  //     value!.confirmPassword
  //   ).subscribe((result:APIResponse<Register>)=>{
  //     console.log(result)
  //     this.router.navigateByUrl('/login').then(()=>{
  //       location.reload()
  //     })
  //     // alert(result.message)
  //   })
  // }

  authError$: Observable<any> = this.store.select(selectAuthError);

  registerUser() {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword } = this.registerForm.value;
      this.store.dispatch(register({ name, email, password, confirmPassword }));
    }
  }

}
