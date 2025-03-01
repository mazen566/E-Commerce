import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wish-list/wish-list.service';
import { IProducts } from '../../shared/interfaces/iproducts';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  imports: [CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit{
  private readonly wishListService = inject(WishListService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  wishListData:IProducts[] = [] ;

  ngOnInit(): void {
    this.getWishData();
  }

  getWishData():void {
    this.wishListService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.data);
        this.wishListData = res.data
      },
    })
  }
  removeItem(id:string):void {
    this.wishListService.removeproductFromWishlist(id).subscribe({
      next: (res) => {
        if(res.status == 'success') {
          console.log(res.data);
          this.wishListData = res.data;
        }
      },
    })
  }
  addToCart(id:string):void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(res.message, 'fresh cart');
        this.cartService.cartNum.set(res.numOfCartItems);
      },
    })
  }
}
