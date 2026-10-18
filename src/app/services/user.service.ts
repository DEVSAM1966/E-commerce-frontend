import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Define the API URL de products (hardcoded en el código)
  private apiUrl: string = "http://localhost:8085/api/v1/users";

  constructor(private httpClient: HttpClient) {}
  
  // Método para obtener un usuario por su ID
  getUserById(id:number):Observable<User>{
    // return this.httpClient.get<User>(this.apiUrl+'/'+id);

    // Usando template literals para construir la URL (es una mejor forma de concatenar strings en TypeScript)
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`);
  }
}
