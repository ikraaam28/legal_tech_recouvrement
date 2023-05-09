import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FicheImpaye } from 'src/app/Models/FicheImpaye';
import { Fichiers } from 'src/app/Models/Fichiers';
import { Notes } from 'src/app/Models/Notes';
import { User } from 'src/app/Models/User';
import { FicheImpayeService } from 'src/app/services/fiche-impaye.service';
import { FichiersService } from 'src/app/services/fichiers.service';
import { NotesService } from 'src/app/services/notes.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  @Input() hideSpecificFields: boolean = false;

  myForm: FormGroup;
  ficheimpaye!: FicheImpaye;
  note! : Notes ;
  user! : User;
  constructor(private fb: FormBuilder, private userservice : UsersService,private ficheimpayeservice: FicheImpayeService, private fichierservice: FichiersService,private router: ActivatedRoute, private noteservice: NotesService) {
    this.myForm = this.fb.group({
      commentaire: [''],
      fichier: [''],
      jugement: [''],
      pv_execution: [''],
      pv_creance: [''],
      enregistrement: ['']
    });
    let idfiche = this.router.snapshot.paramMap.get('id');
    this.ficheimpayeservice.GetFicheImpaye(Number(idfiche)).subscribe(
      (res) =>{
        this.ficheimpaye = res;
        this.note.ficheImpaye= res;
        console.log(this.note.ficheImpaye);
      }
    );
   
    
    let $user_id = localStorage.getItem('id');
    this.userservice.getUser(Number($user_id)).subscribe(
      (res) =>{
        this.user = res;
        this.note.userId = res;
        console.log(this.note.userId)
      }
    )
    
    this.noteservice.registernotes(this.note).subscribe(
      (res)=>{
        console.log('note ajouter');
      }
    )
  }
  Submit(){
    const userData: Fichiers = {
      commentaire: this.myForm.value.commentaire ?? '',
      enregistrement: this.myForm.value.enregistrement ?? null,
      fichier: this.myForm.value.fichiers ?? null,
      jugement: this.myForm.value.jugement ?? null,
      pv_execution: this.myForm.value.pv_execution ?? null,
      pv_creance: this.myForm.value.pv_creance ?? null,
      notes_id: this.note,
      created_at: new Date(),
      updated_at: new Date(),
    };
    
        this.fichierservice.registerfichiers(userData).subscribe(
          response => {
            console.log('register fichiers '); // Handle the response here
          },
          error => {
            console.log(error); // Handle the error here
          }
        );
      }  
}
