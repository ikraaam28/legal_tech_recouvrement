import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './authentification/login/login.component';
import { ConsulterComponent } from './Banque/consulter/consulter.component';
import { HomeComponent } from './Banque/home/home.component';
import { AjoutComponent } from './Banque/ajout/ajout.component';

import { TimelineComponent } from './timeline/timeline.component';
import { ResetpasswordComponent } from './authentification/resetpassword/resetpassword.component';
import { NewpasswordComponent } from './authentification/newpassword/newpassword.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LandingComponent } from './landing/landing.component';
import { AdminComponent } from './admin/admin.component';
import { CallcenterComponent } from './callcenter/callcenter.component';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { MatMenuModule } from '@angular/material/menu'; // Import MatMenuModule
import { MatIconModule } from '@angular/material/icon';
import { AccountComponent } from './account/account.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FicheComponent } from './fiche/fiche.component';
import { NotesComponent } from './fiche/notes/notes.component';
import { CalendreierComponent } from './fiche/calendreier/calendreier.component';
import { UserCardComponent } from './fiche/user-card/user-card.component';
@NgModule({
  declarations: [

    DashboardComponent,
    LoginComponent,
    ConsulterComponent,
    HomeComponent,
    AjoutComponent,
    FicheComponent,
    TimelineComponent,
    ResetpasswordComponent,
    NewpasswordComponent,
    LandingComponent,
    AdminComponent,
    CallcenterComponent,
    CalendreierComponent,
    AccountComponent,
    NavbarComponent,
    NotesComponent,
    UserCardComponent,
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule, 
    BrowserAnimationsModule, 
    BrowserModule,
  ],
  
  providers: [{provide: HTTP_INTERCEPTORS, useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }