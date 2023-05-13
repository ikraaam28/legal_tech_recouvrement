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
  note = new Notes({
    ficheImpaye: null,
    user: null,
  });
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

  }
  
  ngOnInit() {
/*
    let idfiche = this.router.snapshot.paramMap.get('id');
console.error("idfiche = ", idfiche)
    this.ficheimpayeservice.GetFicheImpaye(Number(idfiche)).subscribe((res) => {
      this.ficheimpaye = res;
      this.note.ficheImpaye = res;
     console.log('************************* 1')
      console.log(" res of fiche impaye = ", res);
      console.error("ficheimpaye  ",this.ficheimpaye);
    console.error("user = ",this.user);
    console.error("note  ",this.note);
    });
    let user_id = localStorage.getItem('id');
  
    this.userservice.getUser(Number(user_id)).subscribe((res) => {
      this.user = res;
      this.note.user= res;
      console.log('********************* 2')
      console.log("res of user ", res);
      console.error("ficheimpaye  ",this.ficheimpaye);
    console.error("user = ",this.user);
    console.error("note  ",this.note);
    });
    
    console.error("ficheimpaye  ",this.ficheimpaye);
    console.error("user = ",this.user);
    console.error("note  ",JSON.stringify(this.note));
    */
    let user_id = localStorage.getItem('id');
    let idfiche = this.router.snapshot.paramMap.get('id');
    console.log(user_id, idfiche);
    this.noteservice.registernotes(Number(user_id),Number(idfiche) ).subscribe((res) => {
      console.log('note added');
    });
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
