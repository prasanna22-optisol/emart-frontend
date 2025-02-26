import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../../types/product';
import { APIResponse } from '../../../types/api_response';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../../types/category';
import { Brand } from '../../../types/brand';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent,MatSelectModule,FormsModule,MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {


  customerService=inject(CustomerService)

  searchTerm: string = '';
  categoryId: string = '';
  sortBy: string = '';
  sortOrder: number = -1;
  brandId: string = '';
  page = 1;
  pageSize = 6;
  products:Product[]=[]
  categories:Category[]=[]
  brands:Brand[]=[]
  route=inject(ActivatedRoute)

  constructor(){

  }
  ngOnInit() {
    this.customerService.getAllCustomerCategories().subscribe((result:APIResponse<Product[]>)=>{
      console.log(result)
      this.categories=result.data
    })

    this.customerService.getBrands().subscribe((result:APIResponse<Brand[]>)=>{
      console.log(result)
      this.brands=result.data
    })

    this.route.queryParams.subscribe((x:any)=>{
      this.searchTerm=x.search || ''
      this.categoryId=x.categoryId || ''
      this.getFilteredProducts()
  })
}

  getFilteredProducts(){
    setTimeout(()=>{
      this.customerService.getProducts(
        this.searchTerm,
        this.categoryId,
        this.sortBy,
        this.sortOrder,
        this.brandId,
        this.page,
        this.pageSize
      ).subscribe((result:APIResponse<Product[]>)=>{
        console.log(result)
        this.products=result.data
        if(result.data.length < this.pageSize){
          this.isNext=false
        }
      })
    },2000)
  }

  orderChange($event: any) {
    console.log($event)
    this.sortBy='price'
    this.sortOrder=$event
    this.getFilteredProducts()
  }

  isNext=true

  pageChange(page:number){
    this.page=page;
    this.isNext=true;
    this.getFilteredProducts();
 }

}
