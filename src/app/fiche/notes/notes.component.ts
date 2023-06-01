import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fichiers } from 'src/app/Models/Fichiers';
import { FichiersService } from 'src/app/services/fichiers.service';
import { NotesService } from 'src/app/services/notes.service';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/services/dialog/dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  @Input() hideSpecificFields = false;
  @Input() noteList: any ;
  myForm: FormGroup;
  selectedFile: File | null = null;
  isUploading = false;
  note!: number;
  role: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private fichierservice: FichiersService,
    private noteservice: NotesService,
    private router: Router,
    private userService: UsersService ,
    private toastr:ToastrService,
    private http: HttpClient,
    private dialog: MatDialog

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
  selectedFiles: { [key: string]: File[] } = {};

  onFileSelected(event: any, controlId: string) {
    const selectedFiles = event.target.files;
    this.toastr.success(`${selectedFiles.length} fichier(s) sélectionné(s)`);
  
    // Store the selected files based on the controlId
    this.selectedFiles[controlId] = Array.from(selectedFiles);
  }
  openDialog(fileUrl: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '800px', // Set the desired width of the dialog
      height: '600px', // Set the desired height of the dialog
      data: { fileUrl },
    });

  }
  getFileFromBackend(fileUrl: string): void {
       window.open("http://127.0.0.1:8000/uploads/Fichiers/"+fileUrl, '_blank');
  }

   p: number = 1;
   public currentPage: number = 1;

  Submit(): void {
    if (Object.keys(this.selectedFiles).length === 0) {
      this.toastr.error('Aucun fichier sélectionné');
      return;
    }
  
    const allowedMimeTypes = [
      'application/pdf', // pdf
      'application/msword', // doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // docx
    ];
  
    for (const controlId in this.selectedFiles) {
      const files = this.selectedFiles[controlId];
      if (files.length === 0) {
        this.toastr.warning(`Le champ ${controlId} ne contient aucun fichier`);
        return;
      }
  
      const file = files[0];
      if (file.size === 0) {
        this.toastr.warning(`Le fichier ${file.name} est vide`);
        return;
      }
  
      if (!allowedMimeTypes.includes(file.type)) {
        this.toastr.warning(`Le fichier ${file.name} n'est pas valide`);
        return;
      }
    }
  
    const user_id = localStorage.getItem('userId');
    const idfiche = this.activatedRoute.snapshot.paramMap.get('id');
  
    // Retrieve the form values
    const commentaire = this.myForm.value.commentaire || '';
    const enregistrementFiles = this.selectedFiles['enregistrement'] || [];
    const fichierFiles = this.selectedFiles['fichier'] || [];
    const jugementFiles = this.selectedFiles['jugement'] || [];
    const pvExecutionFiles = this.selectedFiles['pv_execution'] || [];
    const pvCreanceFiles = this.selectedFiles['pv_creance'] || [];
  
    // Construct the userData object
    const userData: Fichiers = {
      commentaire: commentaire,
      enregistrement: enregistrementFiles.length > 0 ? enregistrementFiles[0].name : null,
      fichier: fichierFiles.length > 0 ? fichierFiles[0].name : null,
      jugement: jugementFiles.length > 0 ? jugementFiles[0].name : null,
      pv_execution: pvExecutionFiles.length > 0 ? pvExecutionFiles[0].name : null,
      pv_creance: pvCreanceFiles.length > 0 ? pvCreanceFiles[0].name : null,
      created_at: new Date(),
      updated_at: new Date()
    };
  
    const formData = new FormData();
    for (const controlId in this.selectedFiles) {
      const files = this.selectedFiles[controlId];
      for (const file of files) {
        formData.append(controlId, file, file.name);
      }
    }
  console.log(userData)
    this.noteservice.registernotes(Number(user_id), Number(idfiche)).subscribe(
      (res) => {
        this.note = res.id;
        this.fichierservice.registerfichiers(userData, this.note, formData).subscribe(
          () => {
            this.toastr.success("Note Enregistrée avec succès");
          },
          (error) => {
            this.toastr.error("La note n'a pas été enregistrée");
          }
        );
      },
      (error) => {
        alert(error);
      }
    );
  }
}