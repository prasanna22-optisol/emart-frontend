import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../../types/order';
import { Product } from '../../../../types/product';
import { DatePipe } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  providers: [DatePipe],
  imports: [DatePipe,MatButtonToggleModule],
  templateUrl: './admin-order.component.html',
  styleUrl: './admin-order.component.scss'
})
export class AdminOrderComponent implements OnInit {

  orderService=inject(OrderService)
  orders:Order[]=[]




  constructor(){

  }
  ngOnInit() {
    this.orderService.getAllOrdersForAdmin().subscribe((result:any)=>{
      console.log(result)
      this.orders=result.data
    })
  }

  sellingPrice(product:Product){
        return product.price
  }
  statusChanged(order:Order,status:string){
    console.log("Status:",status)
    console.log(order._id)
    this.orderService.updateOrderStatusByAdmin(order._id!, status).subscribe((result:any)=>{
      order.status=status
      console.log("Status of the order:",order.status)
    })
  }

}
