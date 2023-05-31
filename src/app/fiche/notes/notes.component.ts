import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  @Input() hideSpecificFields = false;
  @Input() noteList: any ;
  myForm: FormGroup;
  selectedFiles: { [key: string]: File | null } = {};
  note!: number;
  role: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private fichierservice: FichiersService,
    private noteservice: NotesService,
    private router: Router,
    private userService: UsersService ,
    private toastr:ToastrService

  ) {
    this.myForm = this.formBuilder.group({
      commentaire: [''],
      fichier: [''],
      jugement: [''],
      pv_execution: [''],
      pv_creance: [''],
      enregistrement: ['']
    });
  }
  ngOnInit() {
    
   
    // Get the user ID from local storage
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.GetRoleUser(userId).subscribe((data: any) => {
        this.role = data.role;
      });
    } else {
      console.error('User ID not found in local storage');
    }
    
    
  }
  
  

  onFileSelected(event: any, field: string): void {
    const file: File = event.target.files[0];
    this.selectedFiles[field] = file || null;
  }
  Submit(): void {
    const formData = new FormData();
    const allowedMimeTypes = [
      'application/pdf', // pdf
      'application/msword', // doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // docx
    ];

    for (const field in this.selectedFiles) {
      const file: File | null = this.selectedFiles[field];
      if (file) {
        if (file.size === 0) {
          console.error(`The file ${field} is empty`);
          return;
        }

        if (!allowedMimeTypes.includes(file.type)) {
          console.error(`The file ${field} must be a valid file`);
          return;
        }

        formData.append(field, file, file.name); // Append the file with its name
        console.log(file);
      } else {
        console.error(`No file selected for the field ${field}`);
        return;
      }
    }

    const user_id = localStorage.getItem('userId');
    const idfiche = this.activatedRoute.snapshot.paramMap.get('id');

    this.noteservice.registernotes(Number(user_id), Number(idfiche)).subscribe(
      (res) => {
        this.note = res.id;
        const userData: Fichiers = {
          commentaire: this.myForm.value.commentaire ?? '',
          enregistrement: this.selectedFiles['enregistrement'] ? this.selectedFiles['enregistrement'].name : null,
          fichier: this.selectedFiles['fichier'] ? this.selectedFiles['fichier'].name : null,
          jugement: this.selectedFiles['jugement'] ? this.selectedFiles['jugement'].name : null,
          pv_execution: this.selectedFiles['pv_execution'] ? this.selectedFiles['pv_execution'].name : null,
          pv_creance: this.selectedFiles['pv_creance'] ? this.selectedFiles['pv_creance'].name : null,
          created_at: new Date(),
          updated_at: new Date()
        };

        
        this.fichierservice.registerfichiers(userData, this.note).subscribe(
          () => {
            alert('Register fichiers: ' + JSON.stringify(userData));
            this.toastr.success("Note Enregistrer Avec SUccés ")

          },
          (error) => {
           this.toastr.error("Note  n'a Pas Eté Enregistrer ")
          }
        );
      },
      (error) => {
        alert(error);
      }
    );
  }
}