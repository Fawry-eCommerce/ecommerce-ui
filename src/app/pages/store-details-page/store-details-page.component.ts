import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StoreModalComponent } from '../../components/store-modal/store-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductsListComponent } from "../../components/products-list/products-list.component";
import { Product } from '../../models/product/Product';
import { ProductsTableComponent } from "../../components/products-table/products-table.component";

@Component({
  selector: 'app-store-details-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, ProductsListComponent, ProductsTableComponent],
  templateUrl: './store-details-page.component.html',
  styleUrl: './store-details-page.component.css'
})
export class StoreDetailsPageComponent implements OnInit {

  store!: Store;
  storeId!: number;
  products!: Product[];
  page: number = 0;
  size: number = 10;
  
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private storeService: StoreService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      this.storeId = params['id'];
      this.getStoreById(this.storeId);
    });
    this.getStoreProducts(this.page, this.size);
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

  getStoreProducts(page: number, size: number) {    
    this.storeService.searchProductsByStoreId(this.storeId, "", "", "", page, size).subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

}
