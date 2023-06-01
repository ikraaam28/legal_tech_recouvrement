import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './authentification/login/login.component';
import { NewpasswordComponent } from './authentification/newpassword/newpassword.component';
import { ResetpasswordComponent } from './authentification/resetpassword/resetpassword.component';
import { AjoutComponent } from './Banque/ajout/ajout.component';
import { ConsulterComponent } from './Banque/consulter/consulter.component';
import { HomeComponent } from './Banque/home/home.component';

import { LandingComponent } from './landing/landing.component';
import { CallcenterComponent } from './callcenter/callcenter.component';

import { AccountComponent } from './account/account.component';
import { AuthGuard } from './guards/auth.guard';
import { FicheComponent } from './fiche/fiche.component';
import { PrintComponent } from './fiche/print/print.component';



const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path:'resetpassword', component:ResetpasswordComponent},
  {path:'newpassword',component:NewpasswordComponent},
  {path:'home',component:HomeComponent, canActivate: [AuthGuard]},
  {path:'ajout',component:AjoutComponent, canActivate: [AuthGuard] },
  {path:'consulter',component:ConsulterComponent, canActivate: [AuthGuard] },
  {path:'fiche/:id',component:FicheComponent},
  {path:'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path:'',component:LandingComponent},
  {path:'callcenter',component:CallcenterComponent},
  {path:'account',component:AccountComponent},
  { path: 'print', component: PrintComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
