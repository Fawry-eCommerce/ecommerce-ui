import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { Store } from '../../models/store/store';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-modal',
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
    MatIconModule
  ],
  templateUrl: './store-modal.component.html',
  styleUrl: './store-modal.component.css'
})
export class StoreModalComponent implements OnInit {

  storeForm!: FormGroup;
  isUpdateMode: boolean;

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private storeService: StoreService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { store: Store, isUpdateMode: boolean }
  ) {
    this.isUpdateMode = data.isUpdateMode;
  }

  ngOnInit(): void {
    this.storeForm = this.fb.group({
      name: [this.data.store ? this.data.store.name : '', Validators.required],
      location: [this.data.store ? this.data.store.location : '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.storeForm.valid) {
      if (this.isUpdateMode) {
        this.updateStore(this.data.store.id, this.storeForm.value);
      } else {
        this.createStrore(this.storeForm.value);
      }
    }
  }

  onCancel(): void {
    this.dialog.closeAll();
  }

  createStrore(storeData: any) {
    this.storeService.createStore(storeData).subscribe({
      next: (res) => {
        console.log('Store created successfully');
        this.dialog.closeAll();
        this.router.navigate(['/stores', res.id]);
      },
      error: (err) => {
        console.error('Error creating store', err);
      }
    });
  }

  updateStore(id: number, storeData: any) {
    this.storeService.updateStore(id, storeData).subscribe({
      next: () => {
        console.log('Store updated successfully');
        this.dialog.closeAll();
        window.location.reload();
      },
      error: (err) => {
        console.error('Error updating store', err);
      }
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }

}
