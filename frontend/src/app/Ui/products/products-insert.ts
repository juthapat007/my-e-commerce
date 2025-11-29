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
      this.errorMessage = '';

      // Create preview
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
    console.log('Selected file:', this.selectedFile);

    // Validate form
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Prepare product data (without image_url - backend will set it)
    const productData: any = {
      name: this.product.name,
      brand: this.product.brand || '',
      category_id: this.product.category_id,
      price: this.product.price,
      currency: this.product.currency,
      stock: this.product.stock,
      description: this.product.description || '',
      image_alt: this.product.name, // Use product name as alt text
    };

    console.log('Sending product data:', productData);
    console.log('Sending image file:', this.selectedFile?.name);

    // Call service with file
    this.productsService.createProduct(productData, this.selectedFile || undefined).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Product created successfully!';
        console.log('Product created:', response);

        setTimeout(() => {
          this.router.navigate(['/products']);
        }, 1500);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error creating product:', error);

        if (error.error && error.error.errors) {
          this.errorMessage = Array.isArray(error.error.errors)
            ? error.error.errors.join(', ')
            : error.error.errors;
        } else if (error.error && error.error.error) {
          this.errorMessage = error.error.error;
        } else {
          this.errorMessage = 'Failed to create product. Please try again.';
        }
      },
    });
  }

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
