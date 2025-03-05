import { TestBed } from '@angular/core/testing';

import { BrandService } from './brand.service';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { APIResponse } from '../../types/api_response';
import { Brand } from '../../types/brand';

fdescribe('BrandService', () => {
  let service: BrandService;
  let httpMock:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(BrandService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all brands',()=>{
    const mockResponse:APIResponse<Brand[]>={
      message:'Brands fetched successfully',
      statusCode:201,
      data:[
        {
          _id:'1',
          name:'Test Brand'
        }
      ]

    }

    service.getAllBrands().subscribe((response)=>{
      expect(response.data).toEqual(mockResponse.data)
    })

    const req=httpMock.expectOne('http://localhost:3000/api/brand/all')
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })

  it('should add a brand',()=>{
    const mockResponse: APIResponse<Brand> = {
      message: 'Brand created successfully',
      statusCode: 201,
      data: {
        _id: '1',
        name: 'New Brand'
      }
    };

    service.addBrand('New Brand').subscribe((response)=>{
      expect(response.data).toEqual(mockResponse.data)
    })

    const req=httpMock.expectOne('http://localhost:3000/api/brand/add')
    expect(req.request.method).toEqual('POST')
    expect(req.request.body).toEqual({name:'New Brand'})
    req.flush(mockResponse)
  })

  it('should get brand by id',()=>{
    const mockResponse: APIResponse<Brand> = {
      message: 'Brand fetched successfully',
      statusCode: 200,
      data: {
        _id: '1',
        name: 'Test Brand'
      }
    };

    service.getBrandById('1').subscribe((response)=>{
      expect(response.data).toEqual(mockResponse.data)
    })

    const req=httpMock.expectOne('http://localhost:3000/api/brand/1')
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  })


});
