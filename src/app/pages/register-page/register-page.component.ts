import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgFor
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;
  errorMessage: string = '';
  roles: any[] = [];

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
    this.registerForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.authService.decodeUserData();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    });
  }

  getAllRoles() {
    this.adminService.getAllRoles().subscribe({
      next: (res: any) => {
        console.log(res);
        
        this.roles = res;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
