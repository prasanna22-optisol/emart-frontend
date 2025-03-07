import { TestBed } from '@angular/core/testing';

import { WishlistService } from './wishlist.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { APIResponse } from '../../types/api_response';
import { WishList } from '../../types/wishlist';

fdescribe('WishlistService', () => {
  let service: WishlistService;
  let httpMock:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(WishlistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch wishlists',()=>{
    const mockResponse:APIResponse<WishList[]>={
      message:'Wishlists fetched successfully',
      statusCode:200,
      data:[
        {
          _id:'1',
          userId:'123',
          productId:'456'
        }
      ]
    };

    service.getWishList().subscribe((response)=>{
      expect(response.data).toEqual(mockResponse.data);
    });

    const req=httpMock.expectOne('http://localhost:3000/api/home/wishlists')
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
  });

  it('should add product to wishlist',()=>{
    const productId = '456';
    const mockResponse: APIResponse<WishList> = {
      message: 'Added to wishlist',
      statusCode: 201,
      data: { _id: '1', userId: '123', productId: '456' }
    };
    service.addWishLists(productId).subscribe((response)=>{
      expect(response.data).toEqual(response.data)
    })
    const req = httpMock.expectOne(`http://localhost:3000/api/home/add-to-wishlist?productId=${productId}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  })
  it('should remove a product from wishlist', () => {
    const productId = '456';
    const mockResponse: APIResponse<WishList> = {
      message: 'Removed from wishlist',
      statusCode: 200,
      data: { _id: '1', userId: '123', productId: '456' }
    };

    service.removeWishlist(productId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:3000/api/home/remove-from-wishlist/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });


});
