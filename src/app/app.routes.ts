import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CategoryFormComponent} from './components/manage/category-form/category-form.component';
import {CategoriesComponent} from './components/manage/categories/categories.component';
import {BrandsComponent} from './components/manage/brands/brands.component';
import {BrandFormComponent} from './components/manage/brand-form/brand-form.component';
import {ProductComponent} from './components/manage/product/product.component';
import {ProductFormComponent} from './components/manage/product-form/product-form.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './components/core/authGuard';
import { AdminDashboardComponent } from './components/manage/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './components/core/adminGuard';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

console.log(authGuard)

export const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
    canActivate:[authGuard]
  },
  {
    path:"profile",
    component:CustomerProfileComponent,
    canActivate:[authGuard]
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [authGuard],
  },
  {
    path:"product/:id",
    component:ProductDetailComponent,
    canActivate: [authGuard],
  },
  {
    path:"wishlist",
    component:WishlistComponent,
    canActivate:[authGuard]
  },
  {
    path:"cart",
    component:ShoppingCartComponent,
    canActivate:[authGuard]
  },
  {
    path:"admin",
    component:AdminDashboardComponent,
    canActivate:[adminGuard]
  },
  {
    path:"admin/categories",
    component:CategoriesComponent,
    canActivate:[adminGuard]
  },
  {
    path:"admin/categories/add",
    component:CategoryFormComponent,
    canActivate:[adminGuard]
  },
  {
    path:"admin/categories/:id",
    component:CategoryFormComponent,
    canActivate:[adminGuard]
  },
  {
    path:"admin/brands",
    component:BrandsComponent,
    canActivate:[adminGuard]
  },
  {
    path:"admin/brands/add",
    component:BrandFormComponent,
    canActivate:[adminGuard]
  },
  {
    path:"admin/brands/:id",
    component:BrandFormComponent,
    canActivate:[adminGuard]
  },
  {
    path:"admin/products",
    component:ProductComponent,
    canActivate:[adminGuard]
  },
  {
    path:"admin/products/add",
    component:ProductFormComponent,
    canActivate:[adminGuard]
  },
  {
    path:"admin/products/:id",
    component:ProductFormComponent,
    canActivate:[adminGuard]
  },
  {
    path:"register",
    component:RegisterComponent,
  },
  {
    path:"login",
    component:LoginComponent,
  }

];
