import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from '../../services/products.service';
import { categories, CategoriesService } from '../../services/categories.service';
import { CommonModule, NgFor, CurrencyPipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './pages/products.html',
  imports: [CommonModule, RouterModule, NgFor, CurrencyPipe],
  styleUrls: ['../style.css'],
})
export class Products implements OnInit {
  products: Product[] = [];
  category: categories[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Products loaded:', data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.errorMessage = 'Failed to load products';
        this.isLoading = false;
      },
    });
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.category = categories;
        console.log('Categories loaded:', categories);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      },
    });
  }

  onEditProduct(productId: number): void {
    console.log('Edit product:', productId);
    this.router.navigate(['/products-edit', productId]);
  }

  onDeleteProduct(productId: number, productName: string): void {
    // แสดง confirmation dialog
    const confirmed = confirm(
      `Are you sure you want to delete "${productName}"?\n\nThis action cannot be undone.`
    );

    if (confirmed) {
      console.log('Deleting product:', productId);

      this.productsService.deleteProduct(productId).subscribe({
        next: () => {
          console.log('Product deleted successfully');

          // ลบสินค้าออกจาก array ใน UI
          this.products = this.products.filter((p) => p.id !== productId);

          // แสดงข้อความสำเร็จ
          alert(`Product "${productName}" has been deleted successfully!`);
        },
        error: (err) => {
          console.error('Error deleting product:', err);

          // แสดงข้อความ error
          if (err.status === 404) {
            alert('Product not found. It may have been already deleted.');
          } else {
            alert('Failed to delete product. Please try again.');
          }
        },
      });
    } else {
      console.log('Delete cancelled');
    }
  }
}
