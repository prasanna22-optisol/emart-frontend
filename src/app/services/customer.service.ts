import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../types/product';
import { APIResponse } from '../../types/api_response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  http=inject(HttpClient)

  constructor() { }

  getNewProducts(): Observable<APIResponse<Product[]>>{
    return this.http.get<APIResponse<Product[]>>("http://localhost:3000/api/home/new-products")
  }

  getFeaturedProducts(): Observable<APIResponse<Product[]>>{
    return this.http.get<APIResponse<Product[]>>("http://localhost:3000/api/home/featured-products")
  }

  getAllCustomerCategories():Observable<APIResponse<Product[]>>{
    return this.http.get<APIResponse<Product[]>>("http://localhost:3000/api/home/all-categories")
  }



}
