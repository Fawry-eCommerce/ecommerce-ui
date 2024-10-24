import { Component, Input } from '@angular/core';
import { Store } from '../../models/store/store';

@Component({
  selector: 'app-store-card',
  standalone: true,
  imports: [],
  templateUrl: './store-card.component.html',
  styleUrl: './store-card.component.css'
})
export class StoreCardComponent {

  @Input() store!: Store;

}
