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
import { UserComponent } from './views/pages/user/user.component';
import {NgbDropdownModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxPaginationModule} from "ngx-pagination";
import {FeatherIconModule} from "./core/feather-icon/feather-icon.module";
import {FormsModule} from "@angular/forms";
import { RoleComponent } from './views/pages/role/role.component';
import {ConsultantLayoutModule} from "./views/ConsultantLayout/ConsultantLayout.module";
import { RiskManagementComponent } from './views/pages/risk-management/risk-management.component';
import {NgChartsModule} from "ng2-charts";
import { StockOverviewComponent } from './views/pages/stock-overview/stock-overview.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { CanvasJSAngularStockChartsModule } from '@canvasjs/angular-stockcharts';


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    ForbiddenComponent,
    UserComponent,
    RoleComponent,
    RiskManagementComponent,
    StockOverviewComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        AdminLayoutModule,
        ConsultantLayoutModule,
        HttpClientModule,
        RouterModule,
        NgbDropdownModule,
        NgbPaginationModule,
        NgxPaginationModule,
        FeatherIconModule,
        FormsModule,
        NgApexchartsModule,
        NgChartsModule,
      CanvasJSAngularStockChartsModule
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
