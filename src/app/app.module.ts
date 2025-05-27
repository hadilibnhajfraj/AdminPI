import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UserAddComponent } from './user-add/user-add.component';
import { TournoiComponent } from './tournoi/tournoi.component';
import { MatchtournoiComponent } from './matchtournoi/matchtournoi.component';
import { EquipetournoiComponent } from './equipetournoi/equipetournoi.component';
import { DispoTerrainComponent } from './dispo-terrain/dispo-terrain.component';
import { MatchChampionnatComponent } from './match-championnat/match-championnat.component';
import { Oauth2RedirectComponent } from './oauth2-redirect/oauth2-redirect.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    UserAddComponent,
    Oauth2RedirectComponent,
	TournoiComponent,
	MatchtournoiComponent,
    EquipetournoiComponent,
    DispoTerrainComponent,
    MatchChampionnatComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
