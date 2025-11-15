import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

@Injectable({ providedIn: 'root'})

export class UsersService{
     private apiUrl = `${environment.apiUrl}/api/v1/users`;

     constructor(private http: HttpClient){}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }  
}