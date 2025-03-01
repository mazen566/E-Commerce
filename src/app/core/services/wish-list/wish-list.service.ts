import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private httpClient:HttpClient) { }

  addProductToWishlist(id:string):Observable<any> {
    return this.httpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist',
      {
        "productId": id
      },
    )
  }
  getLoggedUserWishlist():Observable<any> {
    return this.httpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist')
  }
  removeproductFromWishlist(id:string):Observable<any> {
    return this.httpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)
  }
}
