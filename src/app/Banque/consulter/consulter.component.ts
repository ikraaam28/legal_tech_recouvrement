import { Component, PipeTransform } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FicheImpayeService } from 'src/app/services/fiche-impaye.service';
import { FicheImpaye } from 'src/app/Models/FicheImpaye';
import { Token } from '@angular/compiler';
import { AuthServiceService } from 'src/app/services/auth-service.service';

import jwt_decode from 'jwt-decode';
import { Notes } from 'src/app/Models/Notes';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consulter',
  templateUrl: './consulter.component.html',
  styleUrls: ['./consulter.component.css']
})
export class ConsulterComponent implements PipeTransform  {
  FicheImpayelist: any;
  selectedFile: File | null = null;
  fileName = '';

isLinear=true;
isUploading = false;
  //Form Validables 
registerForm!: FormGroup;
submitted = false;
searchTerm !: string;

filteredFicheImpayelist: FicheImpaye[] | undefined;

constructor( private formBuilder: FormBuilder, private ficheImpayeService: FicheImpayeService,private authservice : AuthServiceService,private http: HttpClient,private router: ActivatedRoute){
}
transform(value: any[], searchText: string): any[] {
  if (!value) return [];
  if (!searchText) return value;
  searchText = searchText.toLowerCase();
  return value.filter((ficheimpaye) => {
    return Object.keys(ficheimpaye).some(key => {
      return ficheimpaye[key].toString().toLowerCase().includes(searchText);
    });
  });
}
onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

onUpload(): void {
  if (!this.selectedFile) {
    console.error('Aucun fichier sélectionné');
    return;
  }

  if (this.selectedFile.size === 0) {
    console.error('Le fichier est vide');
    return;
  }

  const allowedMimeTypes = [
    
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // xlsx
  ];

  if (!allowedMimeTypes.includes(this.selectedFile.type)) {
    console.error('Le fichier doit être un fichier Excel valide');
    return;
  }
  let user_id = localStorage.getItem('id');

  console.log(user_id);
  this.ficheImpayeService.uploadFile(this.selectedFile,Number(user_id))
    .subscribe(
      (res) => {
        console.log('Fichier importé avec succès');
        console.log(res); // logs the response from the backend
      },
      error => {
        console.error('Erreur lors de l\'importation du fichier', error);
      }
    );
}

//Add user form actions
get f() { return this.registerForm.controls; }

deleteFiche(id: number) {
  if (confirm('Are you sure you want to delete this fiche?')) {
    this.ficheImpayeService.deleteFicheImpaye(id).subscribe(
      (response) => {
        this.FicheImpayelist = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
  ngOnInit() {
    this.ficheImpayeService.getFichesImpayes().subscribe(result => {
      this.FicheImpayelist = result;
     
    });
   
  
    //Add User form validations
    
    this.registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    });
    
  }
 
  Empregister = this.formBuilder.group({
    basic: this.formBuilder.group({
      nom:this.formBuilder.control('',Validators.required),
      prenom:this.formBuilder.control('',Validators.required),
      cin:this.formBuilder.control('',Validators.required),
      adresse:this.formBuilder.control('',Validators.required),
      tel:this.formBuilder.control('',Validators.required),
      email:this.formBuilder.control('',Validators.required),

    }),
    contact: this.formBuilder.group({
      montant_creances:this.formBuilder.control(0,Validators.required),
      montant_echeances:this.formBuilder.control(0,Validators.required),
      justificatif_creances:this.formBuilder.control(null),
      objet_creances:this.formBuilder.control('',Validators.required),
      nombre_echeances:this.formBuilder.control(0,Validators.required)
    }),
    address: this.formBuilder.group({
      note_banque:this.formBuilder.control('')
    })
  });
 
  get Basicform(){
    return this.Empregister.get("basic") as FormGroup;
  }
  get contactform(){
    return this.Empregister.get("contact") as FormGroup;
  }
  get addressform(){
    return this.Empregister.get("address") as FormGroup;
  }
 
  HandleSubmit(){
  const  userData: FicheImpaye = {
      nom: this.Empregister.value.basic?.nom ?? '',
      prenom: this.Empregister.value.basic?.prenom ?? '',
      cin: this.Empregister.value.basic?.cin ?? '',
      adresse: this.Empregister.value.basic?.adresse ?? '',
      tel: this.Empregister.value.basic?.tel ?? '',
      email: this.Empregister.value.basic?.email ?? '',
      montant_creances: Number(this.Empregister.value.contact?.montant_creances) ?? 0,
      montant_echeances: Number(this.Empregister.value.contact?.montant_echeances ) ?? 0,
      justificatif_creances: this.Empregister.value.contact?.justificatif_creances ?? null,
      objet_creances: this.Empregister.value.contact?.objet_creances ?? '',
      nombre_echeances: Number(this.Empregister.value.contact?.nombre_echeances) ?? 0,
      note_banque: this.Empregister.value.address?.note_banque ?? '',
      notes : null
    };
    console.log("user", userData);
   
   
      
    const id = +localStorage.getItem('id')!;
      this.ficheImpayeService.registerFicheImpaye(userData,id).subscribe(
        response => {
          console.log(response); // Handle the response here
        },
        error => {
          console.log(error); // Handle the error here
        }
      );
      
    }
  
  
}