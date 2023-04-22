import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

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
      this.authService.login(email, password).subscribe(response => {
        console.log(response);
        // do something with the response
        this.router.navigate(['/home']).then(() => {
          // Scroll to top after navigation
          window.scrollTo(0, 0);
        });
      }, error => {
        console.log(error);
        // handle the error
      });
    }
  }
}
