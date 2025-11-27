import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html', //การใช้,อ้างถึง เทมเพล็ตที่มีอยู่แล้ว
  // templateUrl: './ui/users/users.html',
  // templateUrl: './products/products.html',
  // templateUrl: './ui/category/category.html',
  // templateUrl: './products/products.html',
  styleUrls: ['./app.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class AppComponent {}
