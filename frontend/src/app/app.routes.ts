import { Routes } from '@angular/router';
import { Products } from './Ui/products/products';
import { category } from './Ui/category/category';
import { Users } from './Ui/users/users';
import { AppComponent } from './app';
import { ProductsInsert } from './Ui/products/products-insert';
import { ProductsEdit } from './Ui/products/products-edit';

export const routes: Routes = [
  { path: '', redirectTo: 'first-page', pathMatch: 'full' },

  { path: 'first-page', component: AppComponent },

  { path: 'products', component: Products },
  { path: 'products-insert', component: ProductsInsert },
  { path: 'products-edit', component: ProductsEdit },

  { path: 'category', component: category },

  { path: 'users', component: Users },
];
