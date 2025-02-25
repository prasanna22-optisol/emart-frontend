import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../types/category';
import { APIResponse } from '../../../types/api_response';
import { AuthenticationService } from '../../services/authentication.service';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  styleUrls: ['./header.component.scss'],
  imports: [FormsModule,MatIconModule,RouterModule],
  templateUrl: './header.component.html',
  selector: 'app-header'
})
export class HeaderComponent  implements OnInit {

    authService=inject(AuthenticationService)
    categoryService=inject(CategoryService)
    customerService=inject(CustomerService)
    router=inject(Router)


    ngOnInit(): void {
      this.customerService.getAllCustomerCategories().subscribe((result:APIResponse<Category[]>)=>{
        console.log(result)
        this.categoryList=result.data
      })
    }

    categoryList: Category[]=[]

    // authService: any;
    onSearch($event: Event) {
    }
    searchTerm: any;

    searchCategory(arg0: any) {
    }

    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.router.navigateByUrl('/login')
    }

}
