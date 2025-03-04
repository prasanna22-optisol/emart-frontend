import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../types/order';
import { DatePipe } from '@angular/common';
import { Product } from '../../../types/product';

@Component({
  selector: 'app-customer-order',
  imports: [DatePipe],
  templateUrl: './customer-order.component.html',
  styleUrl: './customer-order.component.scss'
})
export class CustomerOrderComponent implements OnInit {

  orders:Order[]=[]
  http=inject(HttpClient)
  orderService=inject(OrderService)

  constructor() { }

  sellingPrice(product:Product){
      return product.price
  }

  ngOnInit() {

    this.orderService.getCustomerOrders().subscribe((result:any)=>{
      console.log(result)
      this.orders=result.data

    })

  }

}
