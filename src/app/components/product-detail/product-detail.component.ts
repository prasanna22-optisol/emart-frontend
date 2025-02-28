import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CustomerService } from '../../services/customer.service';
import { ActivatedRoute } from '@angular/router';
import { APIResponse } from '../../../types/api_response';
import { Product } from '../../../types/product';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-product-detail',
  imports: [MatIconModule, ProductCardComponent,CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {


  customerService=inject(CustomerService)

  route=inject(ActivatedRoute)
  wishListService=inject(WishlistService)
  cartService=inject(CartService)
  authService=inject(AuthenticationService)
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


  sellingPrice: any;

  isInWishlist(product: Product): boolean {
    let exists = this.wishListService.wishlists.find((p) => p.productId._id === product._id);
    return exists ? true : false;
  }

  addToWishList(product:Product){
    console.log("Wishlist added Product: " , product)
    console.log("Wishlist added Product: " , product._id)
    if(this.isInWishlist(product)){
      this.wishListService.removeWishlist(product._id).subscribe((res)=>{
        console.log("Product removed from wishlist: " , res.data)
      this.wishListService.wishlists = this.wishListService.wishlists.filter(p => p._id !== product._id);    })
  }else{
    this.wishListService.addWishLists(product._id).subscribe((res)=>{
      console.log("Product added t wishlist: " , res.data)
      this.wishListService.wishlists.push(product); // Add product locally to prevent duplicates
    })
  }
  setTimeout(()=>{
    location.reload()
  },400)
 }
 isProductInCart(productId :  string):boolean {
  if (this.cartService.items.find((x) => x.product._id == productId)) {
    return true;
  } else {
    return false;
  }
}

addToCart(product: Product) {
  if(!this.isProductInCart(product._id)){
    this.cartService.addToCart(product._id,1).subscribe(()=>{
      console.log('product added to cart : ',product)
      this.cartService.init()
    })
  }
  else{
    this.cartService.removeFromCart(product._id).subscribe(()=>{
      console.log('product removed from cart : ',product)
      this.cartService.init()
    })
  }
  setTimeout(()=>{
    location.reload()
  },400)
}



}
