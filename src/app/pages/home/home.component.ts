import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsListComponent } from "../../components/products-list/products-list.component";
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product/Product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, NgFor, RouterModule, ProductsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  products!: Product[];
  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts(0, 6).subscribe({
      next: (products) => {
        this.products = products.content;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
