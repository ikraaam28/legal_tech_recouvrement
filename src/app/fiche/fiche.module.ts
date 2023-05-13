import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FicheRoutingModule } from './fiche-routing.module';
import { FicheComponent } from './fiche.component';
import { NotesComponent } from './notes/notes.component';
import { PrintComponent } from './print/print.component';
import { UserCardComponent } from './user-card/user-card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CalendreierComponent } from './calendreier/calendreier.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';


@NgModule({
  declarations: [
    
    CalendreierComponent,
    PrintComponent,
    NavbarComponent,
  ],
   
  imports: [
    CommonModule,
    FicheRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [
   ]
})
export class FicheModule { }
