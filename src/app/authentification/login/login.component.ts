import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import jwt_decode from 'jwt-decode';
import { UsersService } from 'src/app/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReCaptcha2Component } from 'ngx-captcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  userRole: string | undefined;
 

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private userService: UsersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      recaptcha: ['', [Validators.required]]
    });
  }

  get form() {
    return this.loginForm.controls;
  }
  login(): void {
    this.submitted = true;
  
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
  
      // Authenticate the user
      this.authService.login(email, password).subscribe(
        response => {
          // Save the token and user ID to local storage
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('userId', response.user.id);
  
          // Navigate to the appropriate page based on the user's role
          if (response.user.role === 'admin') {
            this.router.navigate(['/admin']).then(
              success => console.log('Navigation successful'),
              error => console.error('Navigation error:', error)
            );
          } else {
            console.log('Redirecting to home page');
            this.router.navigate(['/home']);
          }
        },
        error => {
          console.log('Login error:', error);
          // Handle the error
        }
      );
    }
  }
  
}