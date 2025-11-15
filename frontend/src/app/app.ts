import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './services/products.service';
import { environment } from '../environments/environment';
import { Product,Category } from './services/products.service'; 
import { UsersService } from './services/users.service';
import { CategoriesService } from './services/categories.service';
// import { AppRoutingModule } from './app-routing.module'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.html',//การใช้,อ้างถึง เทมเพล็ตที่มีอยู่แล้ว
  // templateUrl: './users/users.html',
  // templateUrl: './products/products.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class App {
  category: any[] = [];
  users: any[] = [];
  products: any[] = [];  // เพิ่ม products
  image_url = "https://tse1.mm.bing.net/th/id/OIP.HldaE_hiyhEv1q_K3dvXJQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3";


  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
      console.log('Users:', this.users);
    });

    this.productsService.getProducts().subscribe(data => {
      this.products = data;
      console.log('Products:', this.products); // ตรวจสอบใน console
    });

    this.categoriesService.getCategories().subscribe(data => {
      this.category = data;
      console.log('Category:',this.category);
    })
  }
}