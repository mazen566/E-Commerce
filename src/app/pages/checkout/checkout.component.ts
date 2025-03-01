import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../core/services/orders/orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  private readonly formBuilder = inject(FormBuilder);
  private readonly ordersService = inject(OrdersService);
  private readonly activatedRoute = inject(ActivatedRoute);

  checkOutForm!: FormGroup;
  cartID:string = '';

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  initForm():void {
    this.checkOutForm = this.formBuilder.group({
      details: [null, [
        Validators.required
      ]],
      phone: [null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]],
      city: [null, [
        Validators.required
      ]]
    })
  }
  getCartId():void {
    this.activatedRoute.paramMap.subscribe({
      next: (param) => {
        this.cartID = param.get('id')!;
      }
    })
  }
  submitForm():void {
    this.ordersService.checkOutPayMent(this.cartID, this.checkOutForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status == 'success') {
          open(res.session.url)
        }
      },
    })
  }
}
