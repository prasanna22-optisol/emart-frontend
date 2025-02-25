import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-customer-profile',
  imports: [],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent implements OnInit {

  authService=inject(AuthenticationService)

  constructor(){

  }

  ngOnInit() {
  }


}
