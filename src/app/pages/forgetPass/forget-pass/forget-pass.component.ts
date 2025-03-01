import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-forget-pass',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.scss'
})
export class ForgetPassComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  step:number = 1;

  verfiyEmail : FormGroup = this.formBuilder.group({
    email: [null, [
      Validators.required,
      Validators.email,
    ]],
  });
  verfiyCode : FormGroup = this.formBuilder.group({
    resetCode : [null, [
      Validators.required,
      Validators.pattern(/^\w{6}$/),
    ]]
  });
  resetPassword : FormGroup = this.formBuilder.group({
    email: [null, [
      Validators.email,
      Validators.required,
    ]],
    newPassword: [null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]]
  });

  verfiyEmailSubmit():void {
    this.authService.setEmailVerfiy(this.verfiyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if(res.statusMsg === 'success') {
          this.step = 2;
        }
      },
    })
  }
  verfiyCodeSubmit(): void {
    this.authService.setCodeVerfiy(this.verfiyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status === 'Success') {
          this.step = 3;
        }      
      },
    })
  }
  resetPasswordSubmit():void {
    this.authService.setResetPass(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('userToken',res.token);
        this.authService.savaUserData();
        this.router.navigate(['/home'])
      },
    })
  }
}
