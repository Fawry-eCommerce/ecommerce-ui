import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { StoreHistory } from '../../models/store/store-history';
import { TableModule } from 'primeng/table';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { DatePipe, NgClass } from '@angular/common';
import { Page } from '../../models/page';
import { PaginatorComponent } from '../../components/pagination/paginatoin.component';

@Component({
  selector: 'app-store-history-page',
  standalone: true,
  imports: [
    TableModule,
    MatCard,
    MatCardTitle,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    DatePipe,
    PaginatorComponent,
    NgClass
],
  templateUrl: './store-history-page.component.html',
  styleUrl: './store-history-page.component.css'
})
export class StoreHistoryPageComponent implements OnInit {

  storeHistories: StoreHistory[] = [];
  page: number = 0;
  size: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;
  storeId: number = 0;

  constructor(private storeService: StoreService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.storeId = params['id'];
      this.gitStoresHistory();
    });
  }

  onPageChange($event: any) {
    this.page = $event.pageIndex;
    this.size = $event.pageSize;
    this.gitStoresHistory();
  }

  gitStoresHistory(){
    this.storeService.getProductConsumptionByStoreId(this.storeId, this.page, this.size).subscribe({
      next: (res: Page<StoreHistory>) => {
        this.storeHistories = res.content;
        this.size = res.size;
        this.page = res.number;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
