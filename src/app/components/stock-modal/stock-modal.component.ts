import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Stock } from '../../models/store/stock';

@Component({
  selector: 'app-stock-modal',
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
  templateUrl: './stock-modal.component.html',
  styleUrl: './stock-modal.component.css'
})
export class StockModalComponent implements OnInit {

  stockForm!: FormGroup;
  isUpdateMode: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private storeService: StoreService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { storeId: number, productId: number }
  ) { }

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      quantity: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.stockForm.valid) {
      this.addStockToProduct();
    }
  }

  closeModal() {
    this.dialog.closeAll();
  }

  addStockToProduct() {
    let stockBody: Stock = {
      id: 0,
      storeId: this.data.storeId,
      productId: this.data.productId,
      quantity: this.stockForm.value.quantity
    }
    this.storeService.addProductToStock(stockBody).subscribe({
      next: () => {
        this.dialog.closeAll();
        this.router.navigate(['/stores', this.data.storeId]);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
