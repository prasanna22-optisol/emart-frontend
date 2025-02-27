import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../../types/api_response';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../types/product';
import { WishList } from '../../types/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  http=inject(HttpClient)

  wishlists:any[]=[]

  init(){
    return this.getWishList().subscribe((res:APIResponse<any>)=>{
      this.wishlists=res.data || []
      console.log("WishList Items:",this.wishlists)
    })
  }

  getWishList():Observable<APIResponse<any>>{
    return this.http.get<APIResponse<any>> ('http://localhost:3000/api/home/wishlists')
  }

  addWishLists(id:string):Observable<APIResponse<WishList>>{
    return this.http.post<APIResponse<WishList>>(
      `http://localhost:3000/api/home/add-to-wishlist?productId=${id}`,
      {}
    );
  }

  removeWishlist(productId:string):Observable<APIResponse<WishList>>{
    return this.http.delete<APIResponse<WishList>>(`http://localhost:3000/api/home/remove-from-wishlist/${productId}`)
  }


}
