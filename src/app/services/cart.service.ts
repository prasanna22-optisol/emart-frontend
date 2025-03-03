import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../../types/api_response';
import { Product } from '../../types/product';
import { CartItem } from '../../types/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  http=inject(HttpClient)

  items:CartItem[]=[]
 


  init(){
    this.getCartItems().subscribe((result:any)=>{
      this.items=result.data
    })
    \

  }

  constructor() { }


  getCartItems():Observable<APIResponse<any>>{
    return this.http.get<APIResponse<any>> ('http://localhost:3000/api/home/carts/all')
  }

  addToCart(productId:string,quantity:number){
    return this.http.post(`http://localhost:3000/api/home/carts/add/${productId}`,{
      quantity:quantity
    })
  }

  removeFromCart(productId:string){
    return this.http.delete(`http://localhost:3000/api/home/carts/remove/${productId}`)
  }


}
