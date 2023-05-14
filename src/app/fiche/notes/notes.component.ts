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
   note!: number;
  user! : User;
  constructor(private fb: FormBuilder, private userservice : UsersService,private ficheimpayeservice: FicheImpayeService, private fichierservice: FichiersService,private router: ActivatedRoute, private noteservice: NotesService) {
    this.myForm = this.fb.group({
      commentaire: [''],
      fichier:null ,
      jugement:null,
      pv_execution:null ,
      pv_creance:null ,
      enregistrement: null
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
 
  }

  Submit(){
    let user_id = localStorage.getItem('id');
    let idfiche = this.router.snapshot.paramMap.get('id');
    const userData: Fichiers = {
      commentaire: this.myForm.value.commentaire ?? '',
      enregistrement: this.myForm.value.enregistrement.files[0]?? null,
      fichier: this.myForm.value.fichiers.files[0] ?? null,
      jugement: this.myForm.value.jugement.files[0] ?? null,
      pv_execution: this.myForm.value.pv_execution.files[0] ?? null,
      pv_creance: this.myForm.value.pv_creance.files[0] ?? null,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.noteservice.registernotes(Number(user_id),Number(idfiche) ).subscribe((res) => {
      this.note=res.id;
      this.fichierservice.registerfichiers(userData, this.note).subscribe(
        response => {
          alert('register fichiers ');
        },
        error => {
          alert(error);
        }
      );
    });
      }  
}
