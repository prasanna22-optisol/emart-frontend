import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { APIResponse } from '../../../types/api_response';
import { Product } from '../../../types/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [MatIconModule, ProductCardComponent,CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {


  customerService=inject(CustomerService)
  route=inject(ActivatedRoute)

  similarProducts: Product[] = [];
  product!: Product;
  mainImage: any;

  ngOnInit(){
    const id=this.route.snapshot.params["id"]
    this.customerService.getProductById(id).subscribe((result:APIResponse<Product>)=>{
      this.product=result.data

      this.customerService.getProducts('',this.product.categoryId as string,'',-1,'',1,4).subscribe((result:APIResponse<Product[]>)=>{
        this.similarProducts=result.data
        console.log("Similar products:",result.data)
      })
    })



  }
  addToCart(arg0: any) {
  }
  isProductInCart(arg0: any):boolean {
    return false;
  }
  isInWishlist(arg0: any):boolean {
    return false;
  }
  addToWishList(arg0: any) {
  }
  sellingPrice: any;
  changeImage(_t7: any) {
  }


}
