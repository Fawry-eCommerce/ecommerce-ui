import { Component, OnInit } from '@angular/core';
import { ProductsListComponent } from "../../components/products-list/products-list.component";
import { Product } from '../../models/product/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [ProductsListComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent implements OnInit {

  products!: Product[];
  page: number = 0;
  size: number = 10;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts(this.page, this.size);
  }

  getProducts(page: number, size: number): void {
    this.productService.getProducts(page, size).subscribe({
      next: (products) => {
        this.products = products.content;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
