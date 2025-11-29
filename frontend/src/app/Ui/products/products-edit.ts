import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { FormsModule } from '@angular/forms';
import { CategoriesService, categories } from '../../services/categories.service';

@Component({
  selector: 'products-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pages/products-edit.html',
  styleUrls: ['../style.css'],
})
export class ProductsEdit {
  productId!: number;
  product: any = null; // กำหนดเป็น any ชั่วคราว
  category: categories[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct();
    this.loadCategories();
  }

  loadProduct(): void {
    this.productsService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading product:', err);
        this.errorMessage = 'Failed to load product.';
        this.isLoading = false;
      },
    });
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (data) => (this.category = data),
      error: (err) => {
        console.error('Error loading categories:', err);
        this.errorMessage = 'Failed to load categories.';
      },
    });
  }

  cancel() {
    this.router.navigate(['/products']); // กลับไปหน้า products
  }

  saveProduct() {
    // Validate form (optional)
    if (!this.product.name || this.product.price <= 0 || this.product.stock < 0) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    const formData = {
      name: this.product.name,
      brand: this.product.brand,
      category_id: this.product.category_id,
      price: this.product.price,
      currency: this.product.currency,
      stock: this.product.stock,
      description: this.product.description,
      image_url: this.product.image_url,
      image_alt: this.product.image_alt,
    };

    this.productsService.updateProduct(this.productId, formData).subscribe({
      next: () => {
        alert('Product updated successfully!');
        this.router.navigate(['/products']); // กลับไปหน้า products
      },
      error: (err) => {
        console.error('Error updating product:', err);
        this.errorMessage = 'Failed to update product. Please try again.';
      },
    });
  }
}
