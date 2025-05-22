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
    DragDropModule,
   

    ToastrModule.forRoot(),


  ],

  declarations: [
    AppComponent,
    AdminLayoutComponent,
    
    
    
   
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
