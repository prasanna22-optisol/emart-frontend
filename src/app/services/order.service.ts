import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../../types/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http=inject(HttpClient)

  addOrder(order:Order){
    return this.http.post('http://localhost:3000/api/home/add-order',order)
  }

  getCustomerOrders(){
    return this.http.get('http://localhost:3000/api/home/orders')
  }

  getAllOrdersForAdmin(){
    return this.http.get('http://localhost:3000/api/orders/all')
  }

  updateOrderStatus(orderId:string,status:string){
    console.log(orderId,status)
    return this.http.post('http://localhost:3000/api/orders/status/${orderId}',{status:status})
  }

  constructor() { }
}
