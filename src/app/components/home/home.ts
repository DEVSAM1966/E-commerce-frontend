import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderUser } from '../header-user/header-user';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, HeaderUser],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private cd: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: data => {
        // console.log('Productos recibidos:', data);
        this.products = data;
        this.cd.detectChanges(); // Forzar la detección de cambios
      },
      error: err => console.error('Error al obtener productos:', err)
    });
  }

}
