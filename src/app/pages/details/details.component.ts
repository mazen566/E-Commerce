import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from '../../shared/interfaces/iproducts';
import { ProductsService } from '../../core/services/products/products.service';
import { CurrencyPipe } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { WishListService } from '../../core/services/wish-list/wish-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
    private readonly wishListService = inject(WishListService);
    private readonly toastrService = inject(ToastrService);
  //detailsProd: IProducts  = {} as IProducts
  detailsProd: IProducts | null = null;
  //detailsImage: IProducts  [] = []
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) =>{
        let idProd = p.get('id');
        this.productsService.getSpecificProducts(idProd!).subscribe({
          next: (res)=>{
            console.log(res.data);
            this.detailsProd = res.data;
          },
        })
      }
    })
  }
  detailsSlider: OwlOptions = {
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
      }
    },
    nav: true
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
