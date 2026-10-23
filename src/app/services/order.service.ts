import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../common/order';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  
  // URL base para las operaciones relacionadas con las órdenes
  private apiUrl: string = 'http://localhost:8085/api/v1/orders';
  private update: string = 'update/state/order';

  constructor(private httpClient: HttpClient) {}

  // Método para crear una orden
  createOrder(order:Order):Observable<Order> {
    return this.httpClient.post<Order>(this.apiUrl, order);
  }

  // Método para actualizar una orden
  updateOrder(formData: any):Observable<any> {
    return this.httpClient.post<Order>(`${this.apiUrl}/${this.update}`, formData);
  }

  // Método para obtener las Ordenes de un usuario específico
  getOrderByUser(userId:number):Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${this.apiUrl}/by-user/${userId}`);
  }

  // Método para obtener una Orden por su ID
  getOrderById(orderId:number):Observable<Order> {
    return this.httpClient.get<Order>(`${this.apiUrl}/${orderId}`);
  }
  
}
