import { Component } from '@angular/core';
import { Store } from '../../models/store/store';
import { StoreService } from '../../services/store.service';
import { StoreCardComponent } from "../../components/store-card/store-card.component";
import { NgFor, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StoreModalComponent } from "../../components/store-modal/store-modal.component";
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { PaginatorComponent } from '../../components/pagination/paginatoin.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-store-page',
  standalone: true,
  imports: [
    NgFor,
    StoreCardComponent,
    TableModule,
    ButtonModule,
    StoreModalComponent,
    RouterModule,
    PaginatorComponent,
    NgIf
  ],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.css'
})
export class StorePageComponent {

  stores: Store[] = [];
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;
  isAdmin: boolean = false;
  isUpdateMode: boolean = true;
  modalVisible: boolean = false;

  constructor(
    private storeService: StoreService,
    private dialog: MatDialog,
    private authService: AuthService
  ) { 
    authService.userData.subscribe({
      next: () => {
        this.isAdmin = authService.isAdmin();
      }
    });
  }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.storeService.getStores(this.page, this.size).subscribe({
      next: (stores) => {
        this.page = stores.number;
        this.size = stores.size;
        this.totalElements = stores.totalElements;
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

  onPageChange($event: any) {
    this.page = $event.pageIndex;
    this.size = $event.pageSize;
    this.loadStores();
  }

}
