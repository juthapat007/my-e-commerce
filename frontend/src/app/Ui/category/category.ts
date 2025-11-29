import { Component } from '@angular/core';
import { categories } from '../../services/categories.service';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { error } from 'console';

@Component({
  selector: 'app-category',
  imports: [CommonModule],
  templateUrl: './category.html',
  styleUrl: '../style.css',
})
export class Category {
  categories: categories[] = [];
  constructor(private CategoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.CategoriesService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Error:', err),
    });
  }
}
