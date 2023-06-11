import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import {
  Location,
  LocationStrategy,
  HashLocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';
import { SessionStorageService } from '@app/core/services';
import {
  AuthReqInterceptor,
  EncryptDecryptAuthInterceptor,
} from '@app/core/interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { JwtHelperService, JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
// import { JwtModule } from "@auth0/angular-jwt";
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
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
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