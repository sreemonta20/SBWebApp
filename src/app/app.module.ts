import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import {
  HashLocationStrategy,
  LocationStrategy
} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import {
  AuthReqInterceptor,
  EncryptDecryptAuthInterceptor,
} from '@app/core/interceptor';
import { SessionStorageService } from '@app/core/services';
import { JwtModule } from '@auth0/angular-jwt';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

export function tokenGetter() { 
  return sessionStorage.getItem("access_token"); 
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001","localhost:39842","localhost:7101","localhost:5043","localhost:44360"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    SessionStorageService,
    Title,
    { provide: HTTP_INTERCEPTORS, useClass: AuthReqInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EncryptDecryptAuthInterceptor,
      multi: true,
    },
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

// { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
//     JwtHelperService,

// {
//   provide: HTTP_INTERCEPTORS,
//   useClass: LoadingInterceptor,
//   multi: true,
// },