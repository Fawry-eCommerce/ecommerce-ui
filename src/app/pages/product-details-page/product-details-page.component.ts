import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent
  ],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.css'
})
export class ProductDetailsPageComponent implements OnInit {

  productId: number = 0;
  product!: Product;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
      this.getProductById(this.productId);
    });
  }

  addToCart(product: Product) {

  }

  getProductById(id: number) {
    this.productService.getProduct(id).subscribe({
      next: (res) => {
        console.log(res);
        
        this.product = res;
      },
      error: error => {
        console.error(error);
      }
    });
  }

}
