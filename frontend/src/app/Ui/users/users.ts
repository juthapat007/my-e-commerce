import { Component } from '@angular/core';
import { UsersService,User } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


// การนำเข้า UsersService,User มันคนละ object กัน 
@Component({
  selector: 'app-users',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './users.html',
  styleUrl: '../style.css',
})
export class Users {
  users: User[] = [];

  constructor(private UsersService: UsersService) {}


  //🧠 อธิบาย: ngOnInit() คือช่วงที่ component โหลดขึ้นมา → เรียก getUsers() → ได้ข้อมูลมาจาก backend → แสดงในหน้า
  ngOnInit(){
    this.UsersService.getUsers().subscribe({
      next:(data) => {
          this.users = data;
          console.log('Users:',data);
      },
      error: (err) => console.error('Error loading user:',err)
    });
  }
}
