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

import { VideoStreamComponent } from './video-stream/video-stream.component';
import { LoginComponent } from './login/login.component';
import { PublicationComponent } from './publication/publication.component';
import { UserPubComponent } from './user-pub/user-pub.component';
import { UpdatePubComponent } from './update-pub/update-pub.component';
import { SpectateurComponent } from './spectateur/spectateur.component';
import { AllspectateurComponent } from './allspectateur/allspectateur.component';
import { DragDropJoueurComponent } from './Joueur/drag-drop-joueur/drag-drop-joueur.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



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
    ToastrModule.forRoot(),
	DragDropModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    VideoStreamComponent,
    LoginComponent,
    PublicationComponent,
    DragDropJoueurComponent,
    UserPubComponent,
    UpdatePubComponent,
    SpectateurComponent,
    AllspectateurComponent,
	VideoStreamComponent,
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
