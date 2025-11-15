import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <h1>ยินดีต้อนรับ</h1>
      <p>เลือกเมนูด้านล่างเพื่อดูข้อมูล</p>
      
      <div class="quick-links">
        <a routerLink="/products" class="card">
          <span class="material-symbols-outlined">inventory_2</span>
          <h3>Products</h3>
          <p>ดูรายการสินค้าทั้งหมด</p>
        </a>
        
        <a routerLink="/users" class="card">
          <span class="material-symbols-outlined">people</span>
          <h3>Users</h3>
          <p>ดูรายการผู้ใช้</p>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 40px;
    }

    .quick-links {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 30px;
    }

    .card {
      background: white;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      padding: 30px;
      text-align: center;
      text-decoration: none;
      color: #333;
      transition: all 0.3s;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      border-color: #2196f3;
    }

    .card .material-symbols-outlined {
      font-size: 48px;
      color: #2196f3;
      margin-bottom: 10px;
    }

    .card h3 {
      margin: 10px 0;
      color: #333;
    }

    .card p {
      color: #666;
      font-size: 14px;
    }
  `]
})
export class Home { }