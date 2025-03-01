import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { ProductsService } from '../../core/services/products/products.service';
import { WishListService } from '../../core/services/wish-list/wish-list.service';
import { IProducts } from './../../shared/interfaces/iproducts';

@Component({
  selector: 'app-products',
  imports: [RouterLink, CurrencyPipe, SearchPipe, TermtextPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  private readonly toastrService = inject(ToastrService);
  
  products:IProducts[] = [];
  subProducts:Subscription = new Subscription();
  text:string = '';

  ngOnInit(): void {
    this.getProductsData();
  }
  ngOnDestroy(): void {
    this.subProducts.unsubscribe();
  }
  getProductsData():void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products = res.data;
      },
    })
  }
  addToCart(id:string):void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(res.message, 'fresh cart')
        this.cartService.cartNum.set(res.numOfCartItems);
      },
    })
  }
  addToWish(id:string):void {
    this.wishListService.addProductToWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success(res.message, 'fresh cart')
      },
    })
  }
}
