import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Define the API URL de products (hardcoded en el código)
  private apiUrl: string = "http://localhost:8085/api/v1/admin/products";

  constructor(private httpClient: HttpClient) {}

  // Usamos un observable para que este permanentemente escuchando los cambios en la base de datos y se actualice automáticamente en la vista
  
  // Mostrar todos los productos
  getProducts():Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  // Crear un producto
  createProduct(formData:any):Observable<any> {
    return this.httpClient.post<Product>(this.apiUrl, formData);
  }

  // Borrar un producto
  deleteProduct(id:number):Observable<any> {
    return this.httpClient.delete(this.apiUrl + "/" + id);
  }

  // Mostrar un producto por su id
  getProductById(id:number):Observable<Product> {
    return this.httpClient.get<Product>(this.apiUrl + "/" + id);
  }
  
}
