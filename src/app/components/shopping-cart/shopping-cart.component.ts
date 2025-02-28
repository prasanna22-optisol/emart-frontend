import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../types/product';

@Component({
  selector: 'app-shopping-cart',
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {


  cartService = inject(CartService)

  ngOnInit(){
    this.cartService.init()
  }

  sellingPrice(product:Product){
    return product.price
  }

  get cartItems() {
    return this.cartService.items;
  }

  get totalAmount() {
    let amount = 0;
    for (let index = 0; index < this.cartItems.length; index++) {
      const element = this.cartItems[index];
      amount += this.sellingPrice(element.product) * element.quantity;
    }
    return amount;
  }

  addToCart(productId:string,quantity:number){
    this.cartService.addToCart(productId,quantity).subscribe((result)=>{
      this.cartService.init()
    })
  }

  checkout() {
  }

}
