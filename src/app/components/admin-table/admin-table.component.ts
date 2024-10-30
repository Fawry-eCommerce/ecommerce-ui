import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-table',
  standalone: true,
  imports: [
    NgIf,
    TableModule,
    NgFor,
    NgClass
  ],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.css'
})
export class AdminTableComponent {

  @Input() admins: any[] = [];
  @Input() title = 'All Admins';
  adminIdEmitter = new EventEmitter<number>();

  constructor(
    private adminService: AdminService,
  ) {}

  emitAdminId(adminId: number): void {
    this.adminIdEmitter.emit(adminId);
  }

  toggleAdminActivation(adminId: number): void {
    this.adminService.toggleAdminStatus(adminId).subscribe({
      next: (res: any) => {
        this.admins.map(admin => {
          if (admin.id === adminId) {
            admin.active = !admin.active;
          }
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
