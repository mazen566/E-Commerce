import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { CartService } from '../../core/services/cart/cart.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductsService } from '../../core/services/products/products.service';
import { WishListService } from '../../core/services/wish-list/wish-list.service';
import { ICategories } from '../../shared/interfaces/icategories';
import { IProducts } from '../../shared/interfaces/iproducts';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink, CurrencyPipe, TermtextPipe, SearchPipe, FormsModule, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  private readonly toastrService = inject(ToastrService);
  products:IProducts[] = [];
  categories:ICategories[] = [];
  subProducts:Subscription = new Subscription();
  subCategories:Subscription = new Subscription();
  text:string = "";

  ngOnInit(): void {
    this.getProductsData();
    this.getCategoriesData();
  }
  ngOnDestroy(): void {
    this.subProducts.unsubscribe();
    this.subCategories.unsubscribe();
  }

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  getProductsData():void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products = res.data;
      },
    })
  }
  getCategoriesData():void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categories = res.data;
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
