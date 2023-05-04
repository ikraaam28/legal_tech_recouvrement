import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import jwt_decode from 'jwt-decode';
import { get } from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  $to ='';
  constructor(private router: Router, private formBuilder: FormBuilder,private authService:AuthServiceService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get form() { return this.loginForm.controls; }

 
  login(): void {

    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      console.log(email)
      this.authService.login(email, password).subscribe(response => {
        const token = response.token;
        if (token) {
          const decodedToken = jwt_decode(token) as { roles: string[] };
          const roles = decodedToken.roles;
          if (roles.includes("Centre D'appel")) {
            this.$to=  "Centre D'appel";
          } else if (roles.includes('admin')) {
            this.$to=  'admin';
          } else if (roles.includes('user')) {
            this.$to=  'user';
          }
        }
        if (this.$to === "Centre D'appel") {
          return this.router.navigate(['/home']);
        } else {
          return false;
        }
       
      }, error => {
        console.log(error);
        // handle the error
      });
    }
  }
}
