import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FicheComponent } from './fiche.component';
import { NotesComponent } from './notes/notes.component';

import { PrintComponent } from './print/print.component';
import { CalendreierComponent } from './calendreier/calendreier.component';
import { UserCardComponent } from './user-card/user-card.component';

const routes: Routes = [{
  path: '',
  component: FicheComponent, 
  children: [
    { path: 'notes', component: NotesComponent },
    { path: 'calendrier', component: CalendreierComponent },
    { path: 'usercard', component:UserCardComponent},
   
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FicheRoutingModule { }
