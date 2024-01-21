import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from './views/layout/layout.module';
import { AdminLayoutModule } from './views/AdminLayout/AdminLayout.module';
import { AuthGuard } from './_auth/auth.guard';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UsersService } from './services/users.service';
import { ForbiddenComponent } from './views/pages/forbidden/forbidden.component';
import { UserComponent } from './views/pages/user/user.component';
import {
  NgbDropdownModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FeatherIconModule } from './core/feather-icon/feather-icon.module';
import { FormsModule } from '@angular/forms';
import { RoleComponent } from './views/pages/role/role.component';
import { ConsultantLayoutModule } from './views/ConsultantLayout/ConsultantLayout.module';
import { CoursComponent } from './views/cours/cours.component';
import { CertifComponent } from './views/certif/certif.component';
import { RendezVousComponent } from './views/rendez-vous/rendez-vous.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // or '@fullcalendar/timegrid', '@fullcalendar/list'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    ForbiddenComponent,
    UserComponent,
    RoleComponent,
    CoursComponent,
    CertifComponent,
    RendezVousComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    LayoutModule,
    AdminLayoutModule,
    ConsultantLayoutModule,
    HttpClientModule,
    RouterModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgxPaginationModule,
    FeatherIconModule,
    FullCalendarModule,
    FormsModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UsersService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
