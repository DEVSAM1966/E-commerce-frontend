import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { HeaderAdmin } from "../header-admin/header-admin";
import { RouterOutlet, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HeaderAdmin, RouterOutlet, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {  

  // Creamos una variable para almacenar la lista de productos
  products : Product[] = [];

  // Constructor
  constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Llamamos al método para obtener la lista de productos al inicializar el componente
    this.listProducts(); 
  }

  // Método para obtener la lista de productos
  listProducts(){
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.cd.detectChanges(); // Forzar la detección de cambios
        console.log('List of products', this.products); // Mostrar por consola la lista de productos obtenida
      },
      error: (err) => {
        console.error('Error fetching list of products', err);
      }
    });
  }

  // Método para borrar un producto por su ID
  deleteProductById(id:number){
    // Añadimos el mensaje de confrmación antes de borrar el producto
    Swal.fire({
      title: "Esta seguro de eliminar el registro",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) 
        this.productService.deleteProduct(id).subscribe(
          () => this.listProducts() // Volvemos a cargar la lista de productos después de borrar uno
        );
        Swal.fire({
        title: "Producto",
        text: "Producto eliminado exitosamente.",
        icon: "success"
      });
    });
  }

}
