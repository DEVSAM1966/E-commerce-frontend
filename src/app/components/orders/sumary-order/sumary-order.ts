import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderUser } from '../../header-user/header-user';
import { ItemCart } from '../../../common/item-cart';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { OrderProduct } from '../../../common/order-product';
import { Order } from '../../../common/order';
import { OrderState } from '../../../common/order-state';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-sumary-order',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderUser],
  templateUrl: './sumary-order.html',
  styleUrl: './sumary-order.css',
})
export class SumaryOrder implements OnInit {

  //Definir variables
  items : ItemCart [] = [];
  totalCart : number = 0;
  fistName : string = '';
  lastName : string = '';
  email : string = '';
  address : string = '';

  // Definir una lista de orderProducts para almacenar los productos de la orden
  // Esta lista se llenará con los productos del carrito al crear la orden
  orderProducts: OrderProduct[] = [];

  // Definir una variable para almacenar el ID del usuario logueado
  // Ahora se pone un valor fijo para las pruebas, pero en un futuro se obtendrá del token de autenticación
  userId: number = 2;

  constructor(private cartService:CartService, 
              private userService:UserService, 
              private cd: ChangeDetectorRef,
              private orderService:OrderService) { }

  ngOnInit(): void {
    // Ponemos en items la lista de productos que tenemos en el carrito y el total del carrito
    this.items = this.cartService.convertToListFromMap();

    // Mostramos el total de la compra
    this.totalCart = this.cartService.totalCart();

    // Ponemos un usuario para las pruebas dado de alta en BD
    this.getUserById(this.userId);

  }

  // Método para crear pasar los valores de items a orderProducts para crear la orden
  generateOrder(){
    this.items.forEach(
      item => {
        let orderProduct = new OrderProduct(null, item.productId, item.quantity, item.price);
        this.orderProducts.push(orderProduct);
      }
    );

    let order = new Order(null, new Date(), this.orderProducts, this.userId, OrderState.CANCELLED);
    this.orderService.createOrder(order).subscribe(
      data => {
        console.log("Orden creada: " + data.id + " " + data.dateCreated + " " + data.userId + " " + data.orderState);
      }
    );
  }
  
  // Método para eliminar un producto del carrito
  deleteItemCart(productId:number){
    // Eliminamos el producto del carrito
    this.cartService.deleteItemCart(productId);

    // Actualizamos la lista de productos y el total del carrito
    this.items = this.cartService.convertToListFromMap();
    this.totalCart = this.cartService.totalCart();
  }

  // Método para obtener los datos del usuario logueado
  getUserById(id:number){
    this.userService.getUserById(id).subscribe(
      data => {
        this.fistName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.address = data.address;
        this.cd.detectChanges(); // Forzar la detección de cambios
        console.log("Usuario obtenido: " + data.firstName + " " + data.lastName + " " + data.email + " " + data.address);
      }
    );
    console.log("Usuario logueado: " + this.fistName + " " + this.lastName + " " + this.email + " " + this.address);
  }

}