import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../Models/User';

import { HttpClient } from '@angular/common/http';
import { MasterService } from '../services/master.service';
import { UsersService } from '../services/users.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userlist: any;
  createUser = true;
  selectedValue!: string;
  showInput: boolean = false;
  selectedOption: string = 'option1';
  inputValue1: string = '';
  inputValue2: string = '';
  inputValue3: string = '';
  inputValue4: string = '';
  inputValue5: string = '';
  id=0;
  public pageSize: number = 5; // number of items per page
  public currentPage: number = 1; // current page number
  public totalItems: number = 0; // total number of items

  isTouched = false;
  userData: User = {
    email: '', 
    password: '',
    nom: '',
    prenom: '',
    adresse: '',
    numero: '' ,
    mail_charger: '',
    matricule_fiscale: '',
    autre_charger: '',
    id_unique: '',
    roles: []
   
  };
 

  resetUserData() {
    this.userData = {
        email: '', 
        password: '',
        nom: '',
        prenom: '',
        adresse: '',
        numero: '',
        mail_charger: '',
        matricule_fiscale: '',
        autre_charger: '',
        id_unique: '',
        roles: []
    };
}
  onRadioChanges() {
    this.showInput = true;
  }
  onRadioChange() {
    this.showInput = true;
    switch (this.selectedOption) {
      case 'option1':
        this.userData.roles = ['Banque'];
        break;
      case 'option2':
        this.userData.roles = ['Centre D\'appel'];
        break;
      case 'option3':
        this.userData.roles = ['Agent Sur Terrain'];
        break;
      case 'option4':
        this.userData.roles = ['Avocat'];
        break;
        case 'option5':
          this.userData.roles = ['Hussier Nottaire'];
          break;
      default:
        this.userData.roles = ['admin'];
        break;
    }
    console.log(this.selectedOption);
    console.log(this.userData.roles);
  }
  onRadioClick(option: string) {
    this.selectedOption = option;
  }
  
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

  constructor(private snackBar: MatSnackBar, private formBuilder: FormBuilder, private service: MasterService, private userService: UsersService, private toastr:ToastrService) {
  
  }
  
  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        (response) => {
          this.userlist = response;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  
 
  
  isLinear=true;
  modifierUser( id: number,user: User) {
    this.userData = user;
    this.submitted = true;
    this.createUser = false;
    this.id = id;
  }
  //Add user form actions
  onSubmit() {
    if(this.createUser){
    this.registerForm.reset(); 

    this.submitted = true;
    this.userService.registerUser(this.userData).subscribe(
      (response: any) => {
      
        this.toastr.success('Utilisateur Enregistrer Avec Succés');
        this.resetUserData();
      },
      (error: any) => 
      this.toastr.error('Utilisateur Non Enregistrer ')
    );

  }else{
    this.userService.UpdateUser(this.id,this.userData).subscribe(
      (response: any) => {
        
        this.toastr.success(`Utilisateur Modifier Avec Succès`);
        this.resetUserData();
      },
      (error: any) => this.toastr.error("Utilisateur Non Modifier")
    );
  }
  }

     ngOnInit() {
      
   
       //Add User form validations
       this.registerForm = this.formBuilder.group({
       email: ['', [Validators.required, Validators.email]],
       password: ['', [Validators.required,]],
       nom: ['', [Validators.required]],
       prenom: ['', [Validators.required]],
       adresse: ['', [Validators.required]],
       numero: ['', [Validators.required, Validators.pattern('[0-9]*')]],
       id_unique: [null] ,
       mail_charger:[ null],
       autre_charger:[ null],
       matricule_fiscale:[ null],
       });

       this.userService.getUsers().subscribe(result => {
        this.userlist = result;
        this.totalItems = this.userlist.length;
      });
      
     }
    
   
  

}
