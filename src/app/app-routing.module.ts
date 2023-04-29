import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './authentification/login/login.component';
import { NewpasswordComponent } from './authentification/newpassword/newpassword.component';
import { ResetpasswordComponent } from './authentification/resetpassword/resetpassword.component';
import { AjoutComponent } from './Banque/ajout/ajout.component';
import { ConsulterComponent } from './Banque/consulter/consulter.component';
import { HomeComponent } from './Banque/home/home.component';
import { FicheComponent } from './fiche/fiche.component';
import { LandingComponent } from './landing/landing.component';
import { CallcenterComponent } from './callcenter/callcenter.component';
import { CalendarComponent } from './callcenter/calendar/calendar.component';



const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path:'resetpassword', component:ResetpasswordComponent},
  {path:'newpassword',component:NewpasswordComponent},
  {path:'home',component:HomeComponent},
  {path:'ajout',component:AjoutComponent},
  {path:'consulter',component:ConsulterComponent},
  {path:'fiche',component:FicheComponent},
  {path:'',component:LandingComponent},
  {path:'admin',component:AdminComponent},
  {path:'callcenter',component:CallcenterComponent},
  {path:'calendar',component:CalendarComponent},
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
