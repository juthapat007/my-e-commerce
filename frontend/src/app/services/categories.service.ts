import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from './products.service'; 

export interface categories {
  id: number;
  name: string;
  description?: string; //เหมือน ? จะว่างได้นะ 
  created_at: string;
}

@Injectable ({ 
    providedIn: 'root'
})
export class CategoriesService {
    private apiUrl = `${environment.apiUrl}/api/v1/categories`;
    
    constructor(private http: HttpClient) {}

    getCategories(): Observable<categories[]>{
       return this.http.get<categories[]>(this.apiUrl);
    }

    getCategory(id: number): Observable<categories>{
        return this.http.get<categories>(`${this.apiUrl}/${id}`);
    }
}
