import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StoreModalComponent } from '../../components/store-modal/store-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductsListComponent } from "../../components/products-list/products-list.component";

@Component({
  selector: 'app-store-details-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, ProductsListComponent],
  templateUrl: './store-details-page.component.html',
  styleUrl: './store-details-page.component.css'
})
export class StoreDetailsPageComponent implements OnInit {

  store!: Store;

  products = [
    {
      name: 'Product 1',
      price: 29.99,
      description: 'Description for product 1',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      name: 'Product 2',
      price: 39.99,
      description: 'Description for product 2',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      name: 'Product 3',
      price: 49.99,
      description: 'Description for product 3',
      imageUrl: 'https://images.unsplash.com/photo-1547658718-f4311ad64746?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];
  
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private storeService: StoreService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.getStoreById(params['id']);
    });
  }

  getStoreById(id: number): void {
    this.storeService.getStoreById(id).subscribe({
      next: (store: Store) => {
        this.store = store;
      },
      error: (error: any) => {
        console.error(error);
      }
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

  deleteStore(storeId: number): void {
    let confirmed = confirm("Are you sure you want to delete this store?");
    if (confirmed) {
      this.storeService.deleteStore(storeId).subscribe({
        next: () => {
          this.router.navigate(['/stores']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  getStoreProducts() {
    // TODO: Implement this method
  }

}
