import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../types/product';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { Order } from '../../../types/order';
@Component({
  selector: 'app-shopping-cart',
  imports: [ReactiveFormsModule,MatIconModule,MatFormFieldModule,FormsModule,MatRadioModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {


  cartService = inject(CartService)
  formBuilder=inject(FormBuilder)
  step:number=0
  paymentType:string='cash'
  orderService=inject(OrderService)
  router=inject(Router)

  addressForm=this.formBuilder.group({
    address1:[''],
    address2:[''],
    city:[''],
    pincode:['']
  })

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
    this.step = 1;
  }
  addAddress(){
    this.step=2
  }

  completeOrder(){
    let order={
      items: this.cartItems,
      paymentType: this.paymentType,
      address: this.addressForm.value,
      date: new Date(),
    }
    console.log("completed order : " , order)
    this.orderService.addOrder(order).subscribe((result)=>{
      alert("Your order has been submitted successfully , check your email for confirmation")
      this.cartService.init()
      this.step=0
      this.router.navigate(['/orders'])
    })
  }

}
