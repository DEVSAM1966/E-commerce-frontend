import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../common/category';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private apiUrl: string = 'http://localhost:8085/api/v1/admin/categories';

  constructor(private http: HttpClient) {}

  getCategoryList():Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  createCategory(category:Category):Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  deleteCategory(id:number):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getCategoryById(id:number):Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

}
