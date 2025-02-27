import { Component, inject, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Product } from '../../../types/product';
import { APIResponse } from '../../../types/api_response';
import { ProductCardComponent } from "../product-card/product-card.component";
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o"
import { WishlistService } from '../../services/wishlist.service';
@Component({
  standalone: true,
  imports: [ProductCardComponent, CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  wishListService=inject(WishlistService)

  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    autoplaySpeed:20,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: true
  }
  customerService=inject(CustomerService)
  newProducts:Product[]=[]
  featuredProducts:Product[]=[]
  bannerImages:Product[]=[]

  ngOnInit(): void {
    this.customerService.getNewProducts().subscribe((res:APIResponse<Product[]>)=>{
      this.newProducts=res.data
      console.log(this.newProducts)
      this.bannerImages.push(...res.data)
    })
    this.customerService.getFeaturedProducts().subscribe((res:APIResponse<Product[]>)=>{
      this.featuredProducts=res.data
      console.log(this.featuredProducts)
      this.bannerImages.push(...res.data)
    })
  }

}
