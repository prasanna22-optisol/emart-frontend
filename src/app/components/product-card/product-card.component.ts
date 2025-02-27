import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../types/product';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterModule,MatFormFieldModule,MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  cartService=inject(CartService)
  wishListService=inject(WishlistService)


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
  }

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
      this.wishListService.wishlists = this.wishListService.wishlists.filter(p => p.productId._id !== product._id);
      })
  }else{
    this.wishListService.addWishLists(product._id).subscribe((res)=>{
      console.log("Product added t wishlist: " , res.data)
      this.wishListService.wishlists.push(product); // Add product locally to prevent duplicates
    })
  }
 }

  @Input() product!:Product | any

}
