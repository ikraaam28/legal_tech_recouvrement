import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
import { FicheImpayeService } from 'src/app/services/fiche-impaye.service';
=======
>>>>>>> 414fff7856f8b66b02e56391f076c7a16477f58c



@Component({
  selector: 'app-consulter',
  templateUrl: './consulter.component.html',
  styleUrls: ['./consulter.component.css']
})
export class ConsulterComponent  {
<<<<<<< HEAD
  FicheImpayelist: any;
=======
  
>>>>>>> 414fff7856f8b66b02e56391f076c7a16477f58c
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
<<<<<<< HEAD
constructor( private formBuilder: FormBuilder, private ficheImpaye: FicheImpayeService){}
=======
constructor( private formBuilder: FormBuilder){}
>>>>>>> 414fff7856f8b66b02e56391f076c7a16477f58c
isLinear=true;
//Add user form actions
get f() { return this.registerForm.controls; }
onSubmit() {
  
  this.submitted = true;
  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }
  //True if all the fields are filled
  if(this.submitted)
  {
    alert("Great!!");
  }
 
}
<<<<<<< HEAD
deleteFiche(id: number) {
  if (confirm('Are you sure you want to delete this fiche?')) {
    this.ficheImpaye.deleteFicheImpaye(id).subscribe(
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
    this.ficheImpaye.getFichesImpayes().subscribe(result => {
      this.FicheImpayelist = result;
    });

    //Add User form validations
    
=======
  ngOnInit() {
    //Add User form validations
>>>>>>> 414fff7856f8b66b02e56391f076c7a16477f58c
    this.registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    });
  }
  Empregister = this.formBuilder.group({
    basic: this.formBuilder.group({
      firstname:this.formBuilder.control('',Validators.required),
      lastname:this.formBuilder.control('',Validators.required)

    }),
    contact: this.formBuilder.group({
      email:this.formBuilder.control('',Validators.required),
      phone:this.formBuilder.control('',Validators.required),
      fax:this.formBuilder.control('',Validators.required)

    }),
    address: this.formBuilder.group({
      street:this.formBuilder.control('',Validators.required),
      city:this.formBuilder.control('',Validators.required),
      pin:this.formBuilder.control('',Validators.required)
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
    if(this.Empregister.valid){
      console.log(this.Empregister.value);
    }
  }
<<<<<<< HEAD
  
=======
>>>>>>> 414fff7856f8b66b02e56391f076c7a16477f58c
}
