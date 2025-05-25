import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAddComponent } from './user-add/user-add.component';
import { Oauth2RedirectComponent } from './oauth2-redirect/oauth2-redirect.component';

const routes: Routes = [
 /*  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, */
 /* {
    path: '',
    component: AdminLayoutComponent,
  
  },*/
  {
    path: 'login',
    component: LoginComponent
  },
    {
    path: 'register',
    component: RegisterComponent
  },
      {
    path: 'forgot-password',
    component: ForgetpasswordComponent
  },
    {
    path: 'reset-password',
    component: ResetpasswordComponent
  }, {
    path: 'user',
    component: UserListComponent
  }, {
   path: 'updateUser/:id',
    component: UserProfileComponent
  },
   {
    path: '',
    component: DashboardComponent
  }, {
   path: 'add',
    component: UserAddComponent
  },
  // app-routing.module.ts
{ path: 'oauth2-redirect', component: Oauth2RedirectComponent }

  /* {
    path: '**',
    redirectTo: 'dashboard'
  } */
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
