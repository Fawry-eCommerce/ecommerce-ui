import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Product } from '../../models/product/Product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CardModule, ButtonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
}
