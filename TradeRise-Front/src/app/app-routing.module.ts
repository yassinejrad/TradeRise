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
        path: 'profile', component:ProfileComponent,canActivate: [AuthGuard],data:{roles:['User']}
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'Admin',
    component: AdminBaseComponent,
    canActivate: [AuthGuard],data:{roles:['Admin']},
    children: [
      {
        path: 'Dashboard', component:AdminDashboardComponent ,
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'Dashboard', redirectTo: 'dashboard', pathMatch: 'full' }
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
