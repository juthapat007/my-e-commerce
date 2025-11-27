import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';

interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

interface Product {
  name: string;
  category_id?: number;
  price: number;
  currency: string;
  stock: number;
  description?: string;
  brand?: string;
  image_url?: string;
  image_alt?: string;
}

@Component({
  selector: 'app-products-insert',
  templateUrl: './pages/products-insert.html',
  styleUrls: ['../style.css'],
  imports: [CommonModule, FormsModule],
})
export class ProductsInsert implements OnInit {
  product: Product = {
    name: '',
    price: 0,
    currency: 'THB',
    stock: 0,
    description: '',
    brand: '',
    category_id: undefined,
  };

  categories: Category[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.productsService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoading = false;
        console.log('Categories loaded:', categories);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.errorMessage = 'Failed to load categories';
        this.isLoading = false;
      },
    });
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.errorMessage = 'Please select an image file';
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'Image size should be less than 5MB';
        return;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreview = null;

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSaveProduct(): void {
    console.log('=== Saving Product ===');
    console.log('Product data:', this.product);

    // Validate form
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Prepare product data - ensure category_id is a number
    const productData: any = {
      name: this.product.name.trim(),
      brand: this.product.brand?.trim() || '',
      category_id: this.product.category_id ? Number(this.product.category_id) : null,
      price: Number(this.product.price),
      currency: this.product.currency,
      stock: Number(this.product.stock),
      description: this.product.description?.trim() || '',
    };

    // Add image if available
    if (this.imagePreview && typeof this.imagePreview === 'string') {
      productData.image_url = this.imagePreview;
      productData.image_alt = this.product.name;
    }

    console.log('Sending product data:', productData);

    // Call service to create product
    this.productsService.createProduct(productData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Product created successfully!';
        console.log('Product created:', response);

        // Redirect after 1.5 seconds
        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Full error object:', error);

        // Handle different error formats
        if (error.error) {
          if (error.error.errors && Array.isArray(error.error.errors)) {
            this.errorMessage = error.error.errors.join(', ');
          } else if (error.error.errors) {
            this.errorMessage = JSON.stringify(error.error.errors);
          } else if (error.error.error) {
            this.errorMessage = error.error.error;
          } else if (typeof error.error === 'string') {
            this.errorMessage = error.error;
          } else {
            this.errorMessage = 'Failed to create product. Please check all fields.';
          }
        } else if (error.message) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = 'Failed to create product. Please try again.';
        }

        // Log for debugging
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          error: error.error,
        });
      },
    });
  }

  private validateForm(): boolean {
    // Clear previous errors
    this.errorMessage = '';

    if (!this.product.name || !this.product.name.trim()) {
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

  resetForm(): void {
    this.product = {
      name: '',
      price: 0,
      currency: 'THB',
      stock: 0,
      description: '',
      brand: '',
      category_id: undefined,
    };
    this.removeImage();
    this.errorMessage = '';
    this.successMessage = '';
  }

  onGoBack(): void {
    this.router.navigate(['/products']);
  }
}
