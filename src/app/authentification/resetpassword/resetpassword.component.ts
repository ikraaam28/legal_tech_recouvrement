import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordService } from 'src/app/services/password.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent   {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private passwordService: PasswordService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
     
    });
  }

  get form() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

   
  }
  email!: string; 
  showAlert: boolean = false;
  
  sendEmail(): void {
    this.passwordService.sendEmail(this.email)
      .then(response => {
        console.log(response); // Gérer la réponse renvoyée par le backend
        this.showAlert = true; 
      })
      .catch(error => {
        console.error(error); // Gérer les éventuelles erreurs
      });
  }
  
  
}





