import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { StorePageComponent } from './pages/store-page/store-page.component';
import { StoreDetailsPageComponent } from './pages/store-details-page/store-details-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'admin', children: [
        { path: 'dashboard', component: AdminDashboardComponent },
    ], canActivate: [adminGuard] },
    { path: 'products', children: [
        { path: '', component: ProductsPageComponent },
        { path: ':id', component: ProductDetailsPageComponent }
    ] },
    { path: 'stores', children: [
        { path: '', component: StorePageComponent },
        { path: ':id', component: StoreDetailsPageComponent }
    ] }
];
