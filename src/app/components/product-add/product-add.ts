import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { HeaderAdmin } from "../header-admin/header-admin";
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../shared/notification.service';
import { Category } from '../../common/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [HeaderAdmin, FormsModule],
  templateUrl: './product-add.html',
  styleUrl: './product-add.css',
})
export class ProductAdd implements OnInit {
  // Creamos variables para almacenar los datos del producto a agregar
  id: number = 0;
  name: string = '';
  code: string = '001';
  description: string = '';
  price: number = 0;
  urlImage: string = '';
  userId: string = '1';
  categoryId: string = '4';

  // Variable para almacenar la imagen del producto
  selectFile!: File;

  // Variable para almacenar categorias.
  categories : Category[] =[];

  // Constructor
  constructor(private productService: ProductService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private notification: NotificationService,
    private categoryService: CategoryService
  ) {}
  
  ngOnInit(): void {
    this.getCategories()
    this.getProductById();
  }

  // Creamos el método que recoge datos del formulario y los envía al servicio para agregar el producto
  addProduct() {
    const formData = new FormData();

    if (this.id !== 0) {
      formData.append('id', this.id.toString());  // update product
    }

    formData.append('code', this.code);
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('image', this.selectFile);
    formData.append('urlImage', this.urlImage);
    formData.append('userId', this.userId);
    formData.append('categoryId', this.categoryId);
    console.log('FormData:', formData);

    // Llamamos al servicio para agregar el producto
    this.productService.createProduct(formData).subscribe(
      data => {
        console.log('Producto agregado:', data);
        // Limpiamos los campos del formulario después de agregar el producto
        if (this.id === 0) {
          this.id = 0;
          this.name = '';
          this.code = '';
          this.description = '';
          this.price = 0;
          this.urlImage = '';
          this.userId = '1';
          this.categoryId = '4';
        }
        // Enviamos un mensaje de éxito al usuario
        this.notification.success('Producto agregado correctamente');
        // navegamos hasta la vista admin/product
        setTimeout(() => this.router.navigate(['/admin/product']), 100);
      },
      error => {
        console.error('Error al agregar el producto:', error);
        this.notification.error('Error al agregar el producto');
      }
    );

  }

  getProductById(){
    this.activatedRoute.params.subscribe(
      params => {
        const id = params['id'];
        if (id) {
          console.log('ID del producto a editar:', id);
          this.productService.getProductById(id).subscribe(
            data => {
              this.id = data.id;
              this.name = data.name ?? '';
              this.code = data.code ?? '';
              this.description = data.description ?? '';
              this.price = data.price ?? 0;
              this.urlImage = data.urlImage ?? '';
              this.userId = data.userId.toString();
              this.categoryId = data.categoryId.toString();
              this.cd.markForCheck(); // 🔥 fuerza actualización de la vista
              console.log('Datos del producto a editar:', data);


            }
          );
        }
      }
    );
  }

  // Creamos el método que recoge la imagen del producto y la almacena en la variable image
  onFileSelected(event: any) {
    this.selectFile = event.target.files[0];
    console.log('Imagen seleccionada:', this.selectFile);
  }

  // Creamos el método que recoge la lista de categorías y las almacena en la variable categories
  getCategories() {
    return this.categoryService.getCategoryList().subscribe(
      data => {
        this.categories = data;
        console.log('Lista de categorías:', this.categories);
      },
      error => {
        console.error('Error al obtener la lista de categorías:', error);
      }
    );
  }
}
