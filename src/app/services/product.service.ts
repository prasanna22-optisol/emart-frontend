import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponse} from '../../types/api_response';
import {Product} from '../../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  http=inject(HttpClient)

  constructor() { }

  getAllProducts():Observable<APIResponse<Product[]>>{
    return this.http.get<APIResponse<Product[]>>('http://localhost:3000/api/product/all')
  }

  getProductById(id:string):Observable<APIResponse<Product>>{
    return this.http.get<APIResponse<Product>>(`http://localhost:3000/api/product/${id}`)
  }

  addProduct(model:Product):Observable<APIResponse<Product>>{
    const response= this.http.post<APIResponse<Product>>('http://localhost:3000/api/product/add',model)
    alert("Added product !: " + model.name)
    return response
  }

  updateProduct(id:string,model:Product):Observable<APIResponse<Product>>{
    return this.http.put<APIResponse<Product>>(`http://localhost:3000/api/product/update/${id}`,model)
  }

  deleteProduct(id:string):Observable<APIResponse<Product>>{
    return this.http.delete<APIResponse<Product>>(`http://localhost:3000/api/product/delete/${id}`)
  }

}
