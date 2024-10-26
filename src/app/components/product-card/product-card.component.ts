import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Product } from '../../models/product/Product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product; // TODO: Define the type of the product
}
