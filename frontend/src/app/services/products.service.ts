import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Category {
  id: number;
  name: string;
  description?: string; //เหมือน ? จะว่างได้นะ 
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  category_id?: number;
  category?: Category;
  price: number;
  currency: string;
  stock: number;
  description?: string;
  brand?: string;
  image_url?: string;
  image_alt?: string;
  created_at: string;
  updated_at: string;
}

// เป็นการกำหนดtypeให้ข้อมูล
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  // Get all products with optional filters
  getProducts(filters?: {
    category_id?: number;
    search?: string;
    in_stock?: boolean;
  }): Observable<Product[]> {
    let params = new HttpParams();
    
    if (filters?.category_id) {
      params = params.set('category_id', filters.category_id.toString());
    }
    if (filters?.search) {
      params = params.set('search', filters.search);
    }
    if (filters?.in_stock !== undefined) {
      params = params.set('in_stock', filters.in_stock.toString());
    }

    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params });
  }


  // หน้านี่ทำงานคล้าย การส่งค่าผ่าน url http://localhost:3000/api/v1/products/${id} ไปจัดการ

  // Get single product by ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  // Create new product
  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, { product });
  }

  // Update existing product
  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, { product });
  }

  // Delete product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }

  // Get all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  // Get category with products
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
  }
}