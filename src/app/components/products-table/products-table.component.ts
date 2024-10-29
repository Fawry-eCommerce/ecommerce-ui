import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Product } from '../../models/product/Product';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from "../pagination/paginatoin.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [
    ProductCardComponent,
    NgFor,
    TableModule,
    CurrencyPipe,
    TagModule,
    FormsModule,
    PaginatorComponent,
    NgIf
  ],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css'
})
export class ProductsTableComponent {

  @Input() products: Product[] = [];
  @Input() title = 'All Products';
  @Output() productIdEmitter = new EventEmitter<number>();
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
  ) {
    authService.userData.subscribe({
      next: () => {
        this.isAdmin = authService.isAdmin();
      }
    });
  }

  emitProductId(productId: number): void {
    this.productIdEmitter.emit(productId);
  }

}
