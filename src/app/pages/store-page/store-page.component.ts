import { Component, OnInit } from '@angular/core';
import { Store } from '../../models/store/store';
import { StoreService } from '../../services/store.service';
import { StoreCardComponent } from "../../components/store-card/store-card.component";
import { NgFor } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StoreModalComponent } from "../../components/store-modal/store-modal.component";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [NgFor, StoreCardComponent, TableModule, ButtonModule, StoreModalComponent],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.css'
})
export class StorePageComponent {

  stores: Store[] = [];
  page: number = 0;
  size: number = 10;
  isUpdateMode: boolean = true;
  modalVisible: boolean = false;

  constructor(private storeService: StoreService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.storeService.getStores(this.page, this.size).subscribe({
      next: (stores) => {
        this.stores = stores.content;
      },
      error: (err) => {
        console.error(err);
      }
    }
    );
  }

  deleteStore(storeId: number): void {
    let confirmed = confirm("Are you sure you want to delete this store?");
    if (confirmed) {
      this.storeService.deleteStore(storeId).subscribe({
        next: () => {
          this.stores = this.stores.filter(store => store.id !== storeId);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  openCreateModal(): void {
    this.dialog.open(StoreModalComponent, {
      data: {
        isUpdateMode: false
      },
      width: '50%',
      height: 'auto',
      disableClose: true
    });
  }

  openUpdateModal(store: Store): void {
    this.dialog.open(StoreModalComponent, {
      data: {
        isUpdateMode: true,
        store: store
      },
      width: '50%',
      height: 'auto',
      disableClose: true
    });
  }

}