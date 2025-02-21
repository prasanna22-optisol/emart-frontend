import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Category } from '../../types/category';
import { APIResponse } from '../../types/api_response';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  http=inject(HttpClient)

   router=inject(Router)

   currentRoute=signal(this.router.url)

  constructor(){

  }

  getAllCategories():Observable<APIResponse<Category[]>>{
    return this.http.get<APIResponse<Category[]>>('http://localhost:3000/api/category/all')
  }

  addCategory(name:string):Observable<APIResponse<Category>>{
     const response=this.http.post<APIResponse<Category>>('http://localhost:3000/api/category/add',{
      name:name
    })
    alert("Added category!: " + name)
    this.router.navigate(['/admin/categories'])
    return response
  }

  getCategoryById(id:string):Observable<APIResponse<Category>>{
    return this.http.get<APIResponse<Category>>(`http://localhost:3000/api/category/${id}`)
  }

  updateCategory(id:string,name:string):Observable<APIResponse<Category>>{
    return this.http.put<APIResponse<Category>>(`http://localhost:3000/api/category/update/${id}`,{
      name:name
    })
  }

  deleteCategory(id:string):Observable<APIResponse<Category>>{
    return this.http.delete<APIResponse<Category>>(`http://localhost:3000/api/category/delete/${id}`)
  }

  


}
