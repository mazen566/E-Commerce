import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors.interceptor';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(NgxSpinnerModule,),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor, errorsInterceptor, headersInterceptor])),
  ]
};
