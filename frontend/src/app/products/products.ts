
// import { Component, OnInit } from '@angular/core';
// import { ProductsService, Product, Category } from './products.service';
// import { CurrencyPipe } from '@angular/common';


// Component → ใช้สร้าง Angular Component
// OnInit → lifecycle interface ของ Angular → ใช้กับ ngOnInit()
// ProductsService → service ที่เราเขียนเพื่อเรียก Rails API (getProducts(), getCategories())
// Product, Category → type interface สำหรับข้อมูลสินค้าและหมวดหมู่
// CurrencyPipe → pipe ของ Angular สำหรับ format ตัวเลขเป็นสกุลเงิน


// @Component({
//   selector: 'app-products',
//   templateUrl: './products.html',
//     imports:[CurrencyPipe],
//   styleUrls: ['./products.css']
// })
// export class ProductsComponent implements OnInit { 
// # ใช้ implements OnInit → จะเรียก ngOnInit() หลัง component ถูกสร้างเสร็จ






//   products: Product[] = [];
//   categories: Category[] = [];
//   loading = false;
//   error: string | null = null;
// products → array เก็บสินค้าที่เรียกมาจาก API
// categories → array เก็บหมวดหมู่สินค้า
// loading → ใช้แสดง loading spinner ขณะเรียก API
// error → เก็บข้อความ error หากโหลดไม่สำเร็จ
//   // Filter options
//   selectedCategoryId?: number;
//   searchTerm = '';
//   showInStockOnly = false;


// selectedCategoryId → หมวดหมู่ที่ผู้ใช้เลือก (optional)
// searchTerm → คำค้นหาสินค้า
// showInStockOnly → toggle ว่าจะแสดงเฉพาะสินค้าที่มี stock > 0


//   constructor(private productsService: ProductsService) {}
// # inject ProductsService มาให้ component ใช้งาน → เรียก API ได้


//   ngOnInit(): void {
//     this.loadCategories();
//     this.loadProducts();
//   }
// # เรียก loadCategories() และ loadProducts() เพื่อดึงข้อมูลเริ่มต้น 


//   loadCategories(): void {
//     this.productsService.getCategories().subscribe({
//       next: (categories) => {
//         this.categories = categories;
//       },
//       error: (err) => {
//         console.error('Error loading categories:', err);
//       }
//     });
//   }


// เรียก getCategories() จาก service → subscribe เป็น observable
// ถ้าได้ข้อมูล → เก็บใน this.categories
// ถ้า error → log ลง console มันมาจาก service น่ะ 
//   // Get all categories
//   getCategories(): Observable<Category[]> {
// # ฟังก์ชันนี้จะ return Observable ที่มีข้อมูลเป็น array ของ Category (เช่น [ {id:1, name:'Hair Care'}, {id:2, name:'Toothpaste'} ])


//     return this.http.get<Category[]>(`${this.apiUrl}/categories`);
// # ใช้ HttpClient ของ Angular ส่ง HTTP GET request ไปยัง URL ที่กำหนด นี่คือendpoint ของ Rails API 
// # เช่น http://localhost:3000/api/v1/categories
// }
// =======================================================
//   loadProducts(): void {
//     this.loading = true;
//     this.error = null;


//     const filters = {
//       category_id: this.selectedCategoryId, #object filters ส่งไปยัง service ฉันกำหนด typeไว้แล้ว
//       search: this.searchTerm || undefined,
//       in_stock: this.showInStockOnly || undefined
// # เพื่อไม่ส่ง search ถ้าเป็น empty string
//     };


//     this.productsService.getProducts(filters).subscribe({
// # ส่ง request ไป backend ด้วย filters ที่สร้าง


//       next: (products) => {
//         this.products = products;
//         this.loading = false;
// #  เก็บผลและปิด loading
//       },
//       error: (err) => {
//         this.error = 'Failed to load products. Please try again.';
//         this.loading = false;
//         console.error('Error loading products:', err);
// #  เกิด error set ข้อความให้ UI และปิด loading
//       }
//     });

import { Component, OnInit } from '@angular/core';
import { ProductsService,Product } from '../services/products.service'; 
import { Category } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { CommonModule  } from '@angular/common';
@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  imports: [CommonModule ],
  styleUrls: ['../app.css']
})
export class Products implements OnInit {
  products: Product[] = [];
  category: any[] = [];

  constructor(
    private productsService: ProductsService,
    private CategoriesService: CategoriesService
  ){}

  ngOnInit(): void {
    this.productsService.getCategories().subscribe({
      // เรียก2medthod เพราะงั้นจึงเข้าถึงตาราง category ได้ด้วย
      next: (categories) => {
        this.category = categories;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }
}
