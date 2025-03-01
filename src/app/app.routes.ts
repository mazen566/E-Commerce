import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [loggedGuard],
        children: [
            {
                path: 'login',
                loadComponent: () =>
                    import('./pages/login/login.component').then(m => m.LoginComponent),
                title: 'login',
            },
            {
                path: 'register',
                loadComponent: () =>
                    import('./pages/register/register.component').then(m => m.RegisterComponent),
                title: 'register',
            },
            {
                path: 'forget-password',
                loadComponent: () =>
                    import('./pages/forgetPass/forget-pass/forget-pass.component').then(m => m.ForgetPassComponent),
                title: 'forget-password',
            },
        ],
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard], 
        children: [
            {
                path: 'home',
                loadComponent: () =>
                    import('./pages/home/home.component').then(m => m.HomeComponent),
                title: 'home',
            },
            {
                path: 'cart',
                loadComponent: () =>
                    import('./pages/cart/cart.component').then(m => m.CartComponent),
            },
            {
                path: 'wish-list',
                loadComponent: () =>
                    import('./pages/wish-list/wish-list.component').then(m => m.WishListComponent),
            },
            {
                path: 'products',
                loadComponent: () =>
                    import('./pages/products/products.component').then(m => m.ProductsComponent),
                title: 'products',
            },
            {
                path: 'brands',
                loadComponent: () =>
                    import('./pages/brands/brands.component').then(m => m.BrandsComponent),
                title: 'brands',
            },
            {
                path: 'categories',
                loadComponent: () =>
                    import('./pages/categories/categories.component').then(m => m.CategoriesComponent),
                title: 'categories',
            },
            {
                path: 'details/:id',
                loadComponent: () =>
                    import('./pages/details/details.component').then(m => m.DetailsComponent),
                title: 'details',
            },
            {
                path: 'checkout/:id',
                loadComponent: () =>
                    import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
                title: 'checkout',
            },
            
        ],
    },
];
