import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cartDetails:ICart = {} as ICart;
  countNumb:Signal<number> = computed(()=> this.cartService.cartNum())
  
  ngOnInit(): void {
    this.getCartData();
     
  }

  getCartData():void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.data);
        this.cartDetails = res.data;
        this.cartService.cartNum.set(res.numOfCartItems);

      },
    })
  }
  removeItem(id:string):void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails = res.data;
        this.cartService.cartNum.set(res.numOfCartItems)
      },
    })
  }
  updateCount(id:string,count:number):void {
    this.cartService.updateProductQuantity(id,count).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res.data;
      },
    })
  }
  clearItems():void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        console.log(res);
        if(res.message === 'success') {
          this.cartDetails = {} as ICart;
          this.cartService.cartNum.set(0)
        }
      },
    })
  }
}
