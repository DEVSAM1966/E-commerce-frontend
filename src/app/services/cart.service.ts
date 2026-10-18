import { Injectable } from '@angular/core';
import { ItemCart } from '../common/item-cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  // Varible items de tipo Map para almacenar los items del carrito, 
  // donde la clave es el productId y el valor es un objeto ItemCart
  private items: Map<number, ItemCart> = new Map<number, ItemCart>();

  // Variable itemList de tipo ItemCart[] para almacenar los items 
  // del carrito en forma de lista
  itemList : ItemCart[] = [];

  constructor() {}

  // Método para agregar un item al carrito
  addItemCart(itemCart : ItemCart) {
    // Agregar el item al Map de items usando el productId como clave
    this.items.set(itemCart.productId, itemCart);
   }

  // Método para eliminar un item del carrito
  deleteItemCart(productId: number) {
    // Eliminar el item del Map de items usando el productId como clave
    this.items.delete(productId);

    // Imprimimos en consola el Map de items para verificar que se eliminó correctamente
    this.items.forEach((valor, clave) => {
      console.log(`Esta es la Clave: ${clave}, Valor: ${valor.productName}`);
    });
   }

  // Método para calcular el total del carrito
  totalCart() {
    let totalCart:number=0;
    // Iterar sobre los items del Map y sumar el total de cada item
    this.items.forEach(
      (item, clave) => {
      totalCart += item.getTotalPriceItem();
    });
    return totalCart;
   }

  // Método para convertir el Map de items a una lista de ItemCart
  convertToListFromMap() {
    // Limpiar la lista de items antes de llenarla nuevamente
    this.itemList.splice(0, this.itemList.length);
    // Iterar sobre los items del Map y agregarlos a la lista de items
    this.items.forEach(
      (item, clave) => {
        this.itemList.push(item);
      });
    return this.itemList;
   }

}
