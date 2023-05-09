import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FicheImpayeService } from 'src/app/services/fiche-impaye.service';
import { FicheImpaye } from 'src/app/Models/FicheImpaye';
import { Token } from '@angular/compiler';
import { AuthServiceService } from 'src/app/services/auth-service.service';

import jwt_decode from 'jwt-decode';
import { Notes } from 'src/app/Models/Notes';

@Component({
  selector: 'app-consulter',
  templateUrl: './consulter.component.html',
  styleUrls: ['./consulter.component.css']
})
export class ConsulterComponent  {
  FicheImpayelist: any;
  
isLinear=true;
    onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      console.log(excelData);
    };
    reader.readAsArrayBuffer(file);
  }
  //Form Validables 
registerForm!: FormGroup;
submitted = false;
constructor( private formBuilder: FormBuilder, private ficheImpayeService: FicheImpayeService,private authservice : AuthServiceService){
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