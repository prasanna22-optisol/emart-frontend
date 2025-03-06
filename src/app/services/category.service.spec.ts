import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { APIResponse } from '../../types/api_response';
import { Category } from '../../types/category';

fdescribe('CategoryService', () => {
  let service: CategoryService;
  let httpMock:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CategoryService);
    httpMock=TestBed.inject(HttpTestingController)
  });

  afterEach(()=>{
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all categories',()=>{
    const mockResponse:APIResponse<Category[]> ={
      message:'Categories fetched successfully',
      statusCode:200,
      data:[
        {
          _id:'1',
          name:'Electronics'
        }
      ]
    }

    service.getAllCategories().subscribe((response)=>{
      expect(response.data).toEqual(mockResponse.data)
    })

    const req=httpMock.expectOne('http://localhost:3000/api/category/all')
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })

  it('should get a category by id',()=>{
    const mockResponse:APIResponse<Category> ={
      message:'Category fetched successfully',
      statusCode:200,
      data:{
        _id:'1',
        name:'Electronics'
      }
    }

    service.getCategoryById('1').subscribe((response)=>{
      expect(response.data).toEqual(mockResponse.data)
    })

    const req=httpMock.expectOne(`http://localhost:3000/api/category/1`)
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)

  })

  it('should add a category',()=>{
    const mockResponse:APIResponse<Category> ={
      message:'Category added successfully',
      statusCode:201,
      data:{
        _id:'1',
        name:'Electronics'
      }
    }

    service.addCategory('Electronics').subscribe((response)=>{
      expect(response.data).toEqual(mockResponse.data)
    })

    const req=httpMock.expectOne('http://localhost:3000/api/category/add')
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({name:'Electronics'})
    req.flush(mockResponse)
  })

  it('should updated a category',()=>{
    const mockResponse:APIResponse<Category> ={
      message:'Category updated successfully',
      statusCode:200,
      data:{
        _id:'1',
        name:'Electronics'
      }
    }

    service.updateCategory('1','Electronics').subscribe((response)=>{
      expect(response.data).toEqual(mockResponse.data)
    })

    const req=httpMock.expectOne('http://localhost:3000/api/category/update/1')
    expect(req.request.method).toBe('PUT')
    expect(req.request.body).toEqual({name:'Electronics'})
    req.flush(mockResponse)
  })

  it('should delete a category',()=>{
    const mockResponse:APIResponse<Category> ={
      message:'Category deleted successfully',
      statusCode:200,
      data:{
        _id:'1',
        name:'Electronics'
      }
    }

    service.deleteCategory('1').subscribe((response)=>{
      expect(response.data).toEqual(mockResponse.data)
    })

    const req=httpMock.expectOne('http://localhost:3000/api/category/delete/1')
    expect(req.request.method).toBe('DELETE')
    req.flush(mockResponse)
  })

});
