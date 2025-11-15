import { Component } from '@angular/core';
import { Category } from '../services/products.service'; 
import { CategoriesService } from '../services/categories.service';
import { CommonModule } from '@angular/common';
import { error } from 'console';
@Component({
  selector: 'app-category',
  imports: [CommonModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class CategoryComponent  {
  category: Category[] = [];
  constructor(private CategoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.CategoriesService.getCategories().subscribe({
      next:(data) => this.category = data,
      error: (err) => console.error('Error:',err)
    });
  }

}
