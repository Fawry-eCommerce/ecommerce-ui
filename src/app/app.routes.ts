import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import {adminGuard } from './guards/admin.guard';
import { StorePageComponent } from './pages/store-page/store-page.component';
import { StoreDetailsPageComponent } from './pages/store-details-page/store-details-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { StoreHistoryPageComponent } from './pages/store-history-page/store-history-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { authenticatedGuard } from './guards/authenticated.guard';
import { AdminsPageComponent } from './pages/admins-page/admins-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {
        path: 'admins',
        children: [
            { path: '', component: AdminsPageComponent },
            { path: 'dashboard', component: AdminDashboardComponent },
        ], canActivate: [authenticatedGuard, adminGuard]
    },
    {
        path: 'products',
        children: [
            { path: '', component: ProductsPageComponent },
            { path: ':id', component: ProductDetailsPageComponent }
        ]
    },
    {
        path: 'stores',
        children: [
            { path: '', component: StorePageComponent },
            { path: ':id', component: StoreDetailsPageComponent },
            { path: ':id/history', component: StoreHistoryPageComponent, canActivate: [authenticatedGuard, adminGuard] }
        ]
    },
    {
        path: 'cart',
        component: CartPageComponent
    },
    {
        path: 'auth',
        children: [
            { path: 'login', component: LoginPageComponent },
            { path: 'register', component: RegisterPageComponent }
        ]
    }
];
