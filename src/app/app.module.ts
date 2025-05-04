import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TournoiComponent } from './tournoi/tournoi.component';
import { MatchtournoiComponent } from './matchtournoi/matchtournoi.component';
import { EquipetournoiComponent } from './equipetournoi/equipetournoi.component';
import { DispoTerrainComponent } from './dispo-terrain/dispo-terrain.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    TournoiComponent,
    MatchtournoiComponent,
    EquipetournoiComponent,
    DispoTerrainComponent,
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
