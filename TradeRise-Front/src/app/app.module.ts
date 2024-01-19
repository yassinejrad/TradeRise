import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LayoutModule } from './views/layout/layout.module';
import { AdminLayoutModule } from  './views/AdminLayout/AdminLayout.module';
import {AuthGuard} from "./_auth/auth.guard";


import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { MatDialogModule } from '@angular/material/dialog';
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

import { RoleComponent } from './views/pages/role/role.component';
import {ConsultantLayoutModule} from "./views/ConsultantLayout/ConsultantLayout.module";
import { ReclamtionadminComponent } from './views/pages/Reclamation/reclamtionadmin/reclamtionadmin.component';
import { ReclamtionuserComponent } from './views/pages/Reclamation/reclamtionuser/reclamtionuser.component';
import { LoaderComponent } from './views/pages/loader/loader.component';
import { ConsultationConsultantComponent } from './views/pages/Consultation/consultation-consultant/consultation-consultant.component';
import { ConsultationuserComponent } from './views/pages/Consultation/consultationuser/consultationuser.component';
import { PriseadminComponent } from './views/pages/Prise/priseadmin/priseadmin.component';
import { PriseuserComponent } from './views/pages/Prise/priseuser/priseuser.component';
import {UserDashboardComponent} from "./views/pages/dashboard/user-dashboard/user-dashboard.component";
import { CommenatireuserComponent } from './views/pages/Commentaire/commenatireuser/commenatireuser.component';
import { NgChartsModule } from 'ng2-charts';

import { NgApexchartsModule } from "ng-apexcharts";
import { StockscomponnentComponent } from './views/pages/stocks/stockscomponnent/stockscomponnent.component';



@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    ForbiddenComponent,
    UserComponent,
    UserDashboardComponent,
    RoleComponent,
    ReclamtionadminComponent,
    ReclamtionuserComponent,
    LoaderComponent,
    ConsultationConsultantComponent,
    ConsultationuserComponent,
    PriseadminComponent,
    PriseuserComponent,
    CommenatireuserComponent,
    StockscomponnentComponent,

  ],schemas: [ NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    LayoutModule,
    AdminLayoutModule,
    ConsultantLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgxPaginationModule,
    FeatherIconModule,
    FormsModule
  ],
  providers: [
    DatePipe,
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
