import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../types/product';
import { APIResponse } from '../../types/api_response';
import { Observable } from 'rxjs';
import { Brand } from '../../types/brand';

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

  getProducts(
    searchTerm: string,
    categoryId: string,
    sortBy: string,
    sortOrder: number,
    brandId: string,
    page: number,
    pageSize: number
  ):Observable<APIResponse<Product[]>>{
    return this.http.get<APIResponse<Product[]>>(`http://localhost:3000/api/home/product-list`,{
      params:{
        searchTerm:searchTerm,
        categoryId:categoryId,
        sortBy:sortBy,
        sortOrder:sortOrder,
        brandId:brandId,
        page:page,
        pageSize:pageSize
      }
    })
  }

  getBrands():Observable<APIResponse<Brand[]>>{
    return this.http.get<APIResponse<Brand[]>>("http://localhost:3000/api/home/all-brands")
  }

  getProductById(id:string):Observable<APIResponse<Product>>{
    return this.http.get<APIResponse<Product>>(`http://localhost:3000/api/home/single-product/${id}`)
  }



}
