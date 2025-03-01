import { CartService } from './../../core/services/cart/cart.service';
import { Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  isLogin = input<boolean>(true);
  countNum:Signal<number> = computed(()=> this.cartService.cartNum())

  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log('cart',res);
        this.cartService.cartNum.set(res.numOfCartItems)
      }
    })
  }
}
