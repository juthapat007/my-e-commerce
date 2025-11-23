import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

interface Product {
  name: string ;
  category_id?: number;
  price: number;
  currency: string;
  stock: number;
  description?: string;
  brand?: string;
  image_url?: string;
  image_alt?: string;
  created_at?: string;
  updated_at?: string;
}

@Component({
  selector: 'app-products-insert',
  templateUrl: './pages/products-insert.html',
  styleUrls: ['../style.css'],
  imports: [CommonModule, FormsModule] // เพิ่ม imports นี้
})
export class ProductsInsert implements OnInit {
  product: Product = {
    name: '',
    price: 0,
    currency: 'THB',
    stock: 0,
    description: '',
    brand: '',
    category_id: undefined
  };

  categories: Category[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  
  // ตัวแปรสำหรับอัพโหลดรูปภาพ
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // โหลดข้อมูลหมวดหมู่
  loadCategories(): void {
    this.isLoading = true;
    this.http.get<Category[]>(`${this.apiUrl}/categories`).subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.errorMessage = 'Failed to load categories';
        this.isLoading = false;
      }
    });
  }

  // จัดการการอัพโหลดรูปภาพ
  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // ตรวจสอบประเภทไฟล์
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Please select an image file';
        return;
      }

      // ตรวจสอบขนาดไฟล์ (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'Image size should be less than 5MB';
        return;
      }

      this.selectedFile = file;

      // สร้าง image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // ลบรูปภาพที่เลือก
  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;
    
    // Reset file input
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  // บันทึกสินค้า
  onSaveProduct(): void {

    console.log(this.product.name);
    console.log(this.product.brand);
    console.log(this.product.category_id);
    console.log(this.product.price);
    console.log(this.product.currency);
    console.log(this.product.stock);
    console.log(this.product.description);
    // Validate form
    // if (!this.validateForm()) {
    //   return;
    // }

    // this.isLoading = true;
    // this.errorMessage = '';
    // this.successMessage = '';

    // // สร้าง FormData สำหรับส่งข้อมูล (รวมถึงไฟล์รูปภาพ)
    // const formData = new FormData();
    
    // // เพิ่ม product data
    // formData.append('product[name]', this.product.name);
    // formData.append('product[brand]', this.product.brand || '');
    // formData.append('product[category_id]', this.product.category_id?.toString() || '');
    // formData.append('product[price]', this.product.price.toString());
    // formData.append('product[currency]', this.product.currency);
    // formData.append('product[stock]', this.product.stock.toString());
    // formData.append('product[description]', this.product.description || '');
    
    // // เพิ่มไฟล์รูปภาพถ้ามี
    // if (this.selectedFile) {
    //   formData.append('product[image]', this.selectedFile);
    // }

    // this.http.post<Product>(`${this.apiUrl}/products`, formData).subscribe({
    //   next: (response) => {
    //     this.isLoading = false;
    //     this.successMessage = 'Product created successfully!';
        
    //     // รีเซ็ตฟอร์มหลังจากบันทึกสำเร็จ
    //     setTimeout(() => {
    //       this.resetForm();
    //     }, 2000);
    //   },
    //   error: (error) => {
    //     this.isLoading = false;
    //     console.error('Error creating product:', error);
        
    //     if (error.error && error.error.errors) {
    //       this.errorMessage = error.error.errors.join(', ');
    //     } else {
    //       this.errorMessage = 'Failed to create product. Please try again.';
    //     }
    //   }
    // });
  }

  // ตรวจสอบความถูกต้องของฟอร์ม
  private validateForm(): boolean {
    if (!this.product.name.trim()) {
      this.errorMessage = 'Product name is required';
      return false;
    }

    if (!this.product.category_id) {
      this.errorMessage = 'Please select a category';
      return false;
    }

    if (!this.product.price || this.product.price <= 0) {
      this.errorMessage = 'Price must be greater than 0';
      return false;
    }

    if (this.product.stock < 0) {
      this.errorMessage = 'Stock cannot be negative';
      return false;
    }

    return true;
  }

  // รีเซ็ตฟอร์ม
  resetForm(): void {
    this.product = {
      name: '',
      price: 0,
      currency: 'THB',
      stock: 0,
      description: '',
      brand: '',
      category_id: undefined
    };
    this.removeImage();
    this.errorMessage = '';
    this.successMessage = '';
  }

  // กลับไปหน้าก่อนหน้า
  onGoBack(): void {
    this.router.navigate(['/products']);
  }
}