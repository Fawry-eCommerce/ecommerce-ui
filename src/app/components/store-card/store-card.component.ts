import { Component, OnInit } from '@angular/core';
import { Store } from '../../models/store';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-store-card',
  standalone: true,
  imports: [],
  templateUrl: './store-card.component.html',
  styleUrl: './store-card.component.css'
})
export class StoreCardComponent implements OnInit {

  stores: Store[] = [];
  page: number = 0;
  size: number = 20;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.storeService.getStores(this.page, this.size).subscribe({
      next: (stores) => {
        this.stores = stores;
      },
      error: (err) => {
        console.error(err);
      }
    }
    );
  }

}
