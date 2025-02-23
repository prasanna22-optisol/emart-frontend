import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {APIResponse} from '../../types/api_response';
import {Brand} from '../../types/brand';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor() { }

  http=inject(HttpClient)

  router=inject(Router)

  currentRoute=signal(this.router.url)

  getAllBrands():Observable<APIResponse<Brand[]>>{
    return this.http.get<APIResponse<Brand[]>>('http://localhost:3000/api/brand/all')
  }

  addBrand(name:string):Observable<APIResponse<Brand>>{
    const response=this.http.post<APIResponse<Brand>>('http://localhost:3000/api/brand/add',{
      name:name
    })

    alert("Added brand !: " + name)
    return response
  }

  getBrandById(id:string):Observable<APIResponse<Brand>>{
    return this.http.get<APIResponse<Brand>>(`http://localhost:3000/api/brand/${id}`)
  }

  updateBrand(id:string,name:string):Observable<APIResponse<Brand>>{
    return this.http.put<APIResponse<Brand>>(`http://localhost:3000/api/brand/update/${id}`,{
      name:name
    })
  }

  deleteBrand(id:string):Observable<APIResponse<Brand>>{
    return this.http.delete<APIResponse<Brand>>(`http://localhost:3000/api/brand/delete/${id}`)
  }


}
