import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from './views/layout/layout.module';
import { AdminLayoutModule } from  './views/AdminLayout/AdminLayout.module';
import {AuthGuard} from "./_auth/auth.guard";


import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from "@angular/router";
import {AuthInterceptor} from "./_auth/auth.interceptor";
import {UsersService} from "./services/users.service";
import { ForbiddenComponent } from './views/pages/forbidden/forbidden.component';




@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    ForbiddenComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AdminLayoutModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
