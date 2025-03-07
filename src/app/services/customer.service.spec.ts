import { TestBed } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { APIResponse } from '../../types/api_response';
import { Product } from '../../types/product';

fdescribe('CustomerService', () => {
  let service: CustomerService;
  let httpMock:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch new products ',()=>{
    const mockResponse:APIResponse<Product[]>={
      message: 'Products fetched successfully',
      statusCode: 200,
      data: [{ _id: '1', name: 'Product A', price: 100 }]
    }

    service.getNewProducts().subscribe((response)=>{
      expect(response.data).toEqual(mockResponse.data)
    })

    const req=httpMock.expectOne('http://localhost:3000/api/home/new-products')
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)

  })

  it('should fetch featured products',()=>{
    const mockResponse:APIResponse<Product[]>={
      message: 'Products fetched successfully',
      statusCode: 200,
      data: [{ _id: '1', name: 'Product A', price: 100 }]
    }

    service.getFeaturedProducts().subscribe((response)=>{
      expect(response.data).toEqual(mockResponse.data)
    })

    const req=httpMock.expectOne('http://localhost:3000/api/home/featured-products')
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })

  it('should fetch all customer categories',()=>{
    const mockResponse:APIResponse<Product[]>={
      message: 'Products fetched successfully',
      statusCode: 200,
      data: [{ _id: '1', name: 'Product A', price: 100 }]
    }

    service.getAllCustomerCategories().subscribe((response)=>{
      expect(response.data).toEqual(mockResponse.data)
    })

    const req=httpMock.expectOne('http://localhost:3000/api/home/all-categories')
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })

  it('should fetch all brands',()=>{
    const mockResponse:APIResponse<Product[]>={
      message: 'Products fetched successfully',
      statusCode: 200,
      data: [{ _id: '1', name: 'Product A', price: 100 }]
    }

    service.getBrands().subscribe((response)=>{
      expect(response.data).toEqual(mockResponse.data)
    })

    const req=httpMock.expectOne('http://localhost:3000/api/home/all-brands')
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })

  it('should fetch a product by id',()=>{
    const mockResponse:APIResponse<Product>={
      message: 'Product fetched successfully',
      statusCode: 200,
      data: { _id: '1', name: 'Product A', price: 100 }
    }

    service.getProductById('1').subscribe((response)=>{
      expect(response.data).toEqual(mockResponse.data)
    })

    const req=httpMock.expectOne('http://localhost:3000/api/home/single-product/1')
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })









});
