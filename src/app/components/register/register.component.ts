import { Component, inject, InjectableProvider } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../utils/PasswordValidator';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { APIResponse } from '../../../types/api_response';
import { Register } from '../../../types/register';

@Component({
  selector: 'app-register',
  imports: [MatFormFieldModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  authService=inject(AuthenticationService)


  formBuilder = inject(FormBuilder);
  registerForm : FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(5),Validators.required]],
    confirmPassword: ['', [Validators.required, Validators.minLength(5)]]
  },{
    validator: passwordMatchValidator
  });

  registerUser(){
    let value=this.registerForm.value;
    this.authService.register(
      value!.name,
      value!.email,
      value!.password,
      value!.confirmPassword
    ).subscribe((result:APIResponse<Register>)=>{
      console.log(result)
      // alert(result.message)
    })
  }

}
