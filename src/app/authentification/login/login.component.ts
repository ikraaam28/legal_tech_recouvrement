import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import jwt_decode from 'jwt-decode';
import { get } from 'jquery';
import { UsersService } from 'src/app/services/users.service';
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
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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
  
      // Get the role of the user from the server
      this.userService.GetRoleUser(email).subscribe((data: any) => {
        this.userRole = data.role[0];
        console.log('User role:', this.userRole);
  
        // Authenticate the user
        this.authService.login(email, password).subscribe(
          response => {
            console.log('Login response:', response);
  
            // Save the token to local storage
            localStorage.setItem('token', response.token);
           console.log(response.user.id)
           localStorage.setItem('id', response.user.id);
           
            // Navigate to the appropriate page based on the user's role
            if (this.userRole === 'admin') {
              console.log('Redirecting to admin page');
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
      });
    }
  }
  }
 
  
  
  
  
  
  
  

