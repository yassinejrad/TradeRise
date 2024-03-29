import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import {AuthGuard} from "./_auth/auth.guard";
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import {AdminDashboardComponent} from "./views/pages/dashboard/admin-dashboard/admin-dashboard.component";
import {UserDashboardComponent} from "./views/pages/dashboard/user-dashboard/user-dashboard.component";
import {
  ConsultantDashboardComponent
} from "./views/pages/dashboard/consultant-dashboard/consultant-dashboard.component";
import {ForbiddenComponent} from "./views/pages/forbidden/forbidden.component";
import {AdminBaseComponent} from "./views/AdminLayout/admin-base/admin-base.component";
import {ProfileComponent} from "./views/pages/general/profile/profile.component";
import {UserComponent} from "./views/pages/user/user.component";
import {RoleComponent} from "./views/pages/role/role.component";
import {ConsultantBaseComponent} from "./views/ConsultantLayout/consultant-base/consultant-base.component";
import { ReclamtionadminComponent } from './views/pages/Reclamation/reclamtionadmin/reclamtionadmin.component';
import { ReclamtionuserComponent } from './views/pages/Reclamation/reclamtionuser/reclamtionuser.component';
import { ConsultationConsultantComponent } from './views/pages/Consultation/consultation-consultant/consultation-consultant.component';
import { ConsultationuserComponent } from './views/pages/Consultation/consultationuser/consultationuser.component';
import { PriseadminComponent } from './views/pages/Prise/priseadmin/priseadmin.component';
import { PriseuserComponent } from './views/pages/Prise/priseuser/priseuser.component';
import { CommenatireuserComponent } from './views/pages/Commentaire/commenatireuser/commenatireuser.component';
import { StockscomponnentComponent } from './views/pages/stocks/stockscomponnent/stockscomponnent.component';
import {StockOverviewComponent} from "./views/pages/stock-overview/stock-overview.component";
import {RiskManagementComponent} from "./views/pages/risk-management/risk-management.component";

const routes: Routes = [
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],data:{roles:['User']},
    children: [

      {
        path: 'dashboard', component:UserDashboardComponent
      },
      {
        path: 'Reclamtionuser', component:ReclamtionuserComponent
      },
      {
        path: 'Consultationuser', component:ConsultationuserComponent
      },
      {
        path: 'commentaire', component:CommenatireuserComponent
      },
      {
        path: 'profile', component:ProfileComponent,canActivate: [AuthGuard],data:{roles:['User']}
      },
      {
        path: 'priseuser', component:PriseuserComponent
      },
      {
        path: 'stocksuser', component:StockscomponnentComponent
      },
      {
        path: 'riskManagement', component:RiskManagementComponent,canActivate: [AuthGuard],data:{roles:['User']}
      },
      {
        path: 'stockOverview', component:StockOverviewComponent,canActivate: [AuthGuard],data:{roles:['User']}
      },
      //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' ,canActivate: [AuthGuard],data:{roles:['User']}},
      //{ path: '**', redirectTo: 'dashboard', pathMatch: 'full',canActivate: [AuthGuard],data:{roles:['User']} }
    ]
  },
  {
    path: 'Consultant',
    component: ConsultantBaseComponent,
    canActivate: [AuthGuard],data:{roles:['Consultant']},
    children: [

      {
        path: 'Dashboard', component:ConsultantDashboardComponent
      },
      {
        path: 'Consultationconsultant', component:ConsultationConsultantComponent
      },
      {
        path: 'profile', component:ProfileComponent,canActivate: [AuthGuard],data:{roles:['Consultant']}
      },
      //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' ,canActivate: [AuthGuard],data:{roles:['User']}},
      //{ path: '**', redirectTo: 'dashboard', pathMatch: 'full',canActivate: [AuthGuard],data:{roles:['User']} }
    ]
  },
  {
    path: 'Admin',
    component: AdminBaseComponent,
    canActivate: [AuthGuard],data:{roles:['Admin']},
    children: [
      {
        path: 'Dashboard', component:AdminDashboardComponent,
      },
      {
        path: 'profile', component:ProfileComponent,canActivate: [AuthGuard],data:{roles:['Admin']}
      },
      {
        path: 'Users', component:UserComponent,canActivate: [AuthGuard],data:{roles:['Admin']}
      },
      {
        path: 'Roles', component:RoleComponent,canActivate: [AuthGuard],data:{roles:['Admin']}
      },
      {
        path: 'Reclamtionadmin', component:ReclamtionadminComponent
      },
      {
        path: 'priseadmin', component:PriseadminComponent
      },

      //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      //{ path: 'Dashboard', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
    data: {
      'type': 404,
      'title': 'Page Forbidden',
      'desc': 'Oopps!! The page you were looking for is forbidden.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
