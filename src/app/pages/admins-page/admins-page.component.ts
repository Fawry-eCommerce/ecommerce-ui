import { Component, OnInit } from '@angular/core';
import { AdminTableComponent } from '../../components/admin-table/admin-table.component';
import { AdminService } from '../../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminModalComponent } from '../../components/admin-modal/admin-modal.component';

@Component({
  selector: 'app-admins-page',
  standalone: true,
  imports: [
    AdminTableComponent,
    AdminModalComponent
],
  templateUrl: './admins-page.component.html',
  styleUrl: './admins-page.component.css'
})
export class AdminsPageComponent implements OnInit {

  admins: any[] = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAllAdmins();
  }

  getAllAdmins() {
    return this.adminService.getAllAdmins().subscribe({
      next: (admins: any) => {
        this.admins = admins;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  openAddAdminModal() {
    this.dialog.open(AdminModalComponent, {
      width: '50%',
      height: 'auto',
      disableClose: true
    });
  }

  addAdmin() {
    
  }

}
