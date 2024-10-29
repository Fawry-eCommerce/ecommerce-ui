import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-modal',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatError,
    MatIconModule,
    NgFor
  ],
  templateUrl: './admin-modal.component.html',
  styleUrl: './admin-modal.component.css'
})
export class AdminModalComponent {

  adminForm!: FormGroup;
  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllRoles();
    this.adminForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.adminService.addAdmin(this.adminForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.dialog.closeAll();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getAllRoles() {
    this.adminService.getAllRoles().subscribe({
      next: (res: any) => {
        this.roles = res;
        console.log(this.roles);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onCancel(): void {
    this.dialog.closeAll();
  }

}
