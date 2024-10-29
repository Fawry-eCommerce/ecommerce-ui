import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [
    NgIf,
    TableModule
  ],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css'
})
export class AdminTableComponent {

  @Input() admins: any[] = [];
  @Input() title = 'All Products';
  adminIdEmitter = new EventEmitter<number>();

  constructor() {}

  emitAdminId(adminId: number): void {
    this.adminIdEmitter.emit(adminId);
  }

}
