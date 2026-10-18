import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { HeaderUser } from '../../header-user/header-user';
import { ItemCart } from '../../../common/item-cart';

@Component({
  selector: 'app-detail-product',
  imports: [FormsModule, HeaderUser],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css',
})
export class DetailProduct implements OnInit {

  // Definición de variables para almacenar los detalles del producto
  // Y realizar un binding con la vista
  id : number = 0;
  name : string = '';
  description : string = '';
  price : number = 0;
  urlImage : string = '';
  quantity : number = 0;

  // Nueva señal para el feedback visual
  mostrarFeedback = signal(false);

  ngOnInit(): void {
    // Llamada al método para obtener los detalles del producto al inicializar 
    // el componente
    this.getProductById();
  }

  // Inyección de dependencias para los servicios necesarios
  constructor(private productService: ProductService, 
              private activatedRoute: ActivatedRoute, 
              private cartService: CartService, 
              private cd: ChangeDetectorRef) {
  } 

  // Método para obtener los detalles del producto por su ID
  getProductById(): void {
    this.activatedRoute.params.subscribe(
      p => {
        let id = p['id'];
        this.productService.getProductById(id).subscribe(
          (data) => {
            this.id = data.id;
            this.name = data.name;
            this.description = data.description;
            this.price = data.price;
            this.urlImage = data.urlImage;
            this.cd.detectChanges();
          }
        );
      }
    );
  }

  // Método para añadir el producto al carrito de la compra
  addCart(id: number){
    console.log('Carrito de la compra. Id product: ', id);
    console.log('Carrito de la compra. Nombre: ', this.name);
    console.log('Carrito de la compra. Cantidad: ', this.quantity);
    console.log('Carrito de la compra. Precio: ', this.price);

    // Se crea un objeto ItemCart con los detalles del producto a añadir al carrito
    let item = new ItemCart(id, this.name, this.quantity, this.price);

    // Añadimos item al carrito
    this.cartService.addItemCart(item);

    // Verificamos el contenido del carrito en la consola para depuración
    console.log("Total carrito: ");
    console.log(this.cartService.totalCart())

    // Activar el efecto visual
    this.mostrarFeedback.set(true);

    // Ocultarlo automáticamente después de 4 segundos
    setTimeout(() => this.mostrarFeedback.set(false), 4000);
  }
}
