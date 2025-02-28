import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../types/category';
import { APIResponse } from '../../../types/api_response';
import { AuthenticationService } from '../../services/authentication.service';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterModule } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  styleUrls: ['./header.component.scss'],
  imports: [FormsModule,MatIconModule,RouterModule,TitleCasePipe],
  templateUrl: './header.component.html',
  selector: 'app-header'
})
export class HeaderComponent  implements OnInit {

    authService=inject(AuthenticationService)
    categoryService=inject(CategoryService)
    customerService=inject(CustomerService)
    router=inject(Router)
    searchTerm!:string


    ngOnInit(): void {
      this.customerService.getAllCustomerCategories().subscribe((result:APIResponse<Category[]>)=>{
        console.log(result)
        this.categoryList=result.data
      })
    }

    categoryList: Category[]=[]

    // authService: any;
    onSearch(e:any) {
      if(e.target.value){
        this.router.navigateByUrl("/products?search="+e.target.value)
     }
    }

    searchCategory(id:string) {
      this.searchTerm="";
      this.router.navigateByUrl("/products?categoryId="+id!)
    }

    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')

        this.router.navigate(['/login'])
        location.reload()

    }

}
