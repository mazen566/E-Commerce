import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  isLoading:boolean = false;
  msgError:string = "";
  isSuccess:string = "";

  loginForm:FormGroup = this.formBuilder.group({
    email: [null, [
      Validators.required,
      Validators.email,
    ]],
    password: [null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]]
  })

  submitForm():void {
    if(this.loginForm.valid){
      this.isLoading = true;
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message === 'success'){
            setTimeout(() => {
              
              localStorage.setItem('userToken', res.token);
              this.authService.savaUserData();

              this.router.navigate(['/home']);
            }, 500);
            this.isSuccess = res.message;
          }
          this.isLoading = false;
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
          this.msgError = err.error.message;
          this.isLoading = false;
        }
      })
    }
  }
}
