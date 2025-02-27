import { Component, inject, Input } from '@angular/core';
import { Product } from '../../../types/product';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterModule,MatFormFieldModule,MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  wishListService=inject(WishlistService)
  isProductInCart(arg0: string):boolean {
    return false
  }

  addToCart(arg0: Product) {
  }
  isInWishlist(product: Product): boolean {
    let exists = this.wishListService.wishlists.find((p) => p._id === product._id);
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
      console.log("Product added to wishlist: " , res.data)
      this.wishListService.wishlists.push(product); // Add product locally to prevent duplicates
    })
  }
 }

  @Input() product!:Product

}
