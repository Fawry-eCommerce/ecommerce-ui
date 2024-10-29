import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Stock } from '../../models/store/stock';

@Component({
  selector: 'app-new-stock-modal',
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
  templateUrl: './new-stock-modal.component.html',
  styleUrl: './new-stock-modal.component.css'
})
export class NewStockModalComponent implements OnInit {

  stockForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private storeService: StoreService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { storeId: number }
  ) { }

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      productId: [null, Validators.required],
      quantity: [0, Validators.required],
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }

  onSubmit(): void {
    if (this.stockForm.valid) {
      this.addNewStockProduct();
    }
  }

  addNewStockProduct() {
    let stockBody: Stock = {
      id: 0,
      storeId: this.data.storeId,
      productId: this.stockForm.value.productId,
      quantity: this.stockForm.value.quantity
    }
    this.storeService.addProductToStock(stockBody).subscribe({
      next: (res) => {
        this.dialog.closeAll();
        this.router.navigate(['/stores', res.storeId]);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
