import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'admin', children: [
        { path: 'dashboard', component: AdminDashboardComponent },
    ], canActivate: [adminGuard] },
    { path: 'products', children: [
        // { path: '', component: ProductsComponent },
    ] },
    { path: 'stores', children: [
        // { path: '', component: StoreConponent },
    ] }
];
