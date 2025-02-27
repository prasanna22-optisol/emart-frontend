import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../types/product';
import { WishlistService } from '../../services/wishlist.service';
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
  selector: 'app-wishlist',
  imports: [ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {


  wishlists:any[]=[]

  wishListService=inject(WishlistService)


  ngOnInit() {
    this.wishListService.init()
  }



}
