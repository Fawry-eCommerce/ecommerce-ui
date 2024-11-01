import { Component, Input } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CurrencyPipe, NgFor } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Product } from '../../models/product/Product';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    NgFor,
    TableModule,
    CurrencyPipe,
    TagModule
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {

  @Input() products: Product[] = [];
  @Input() title = 'All Products';

}
