import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category } from '../../../common/category';
import { CategoryService } from '../../../services/category.service';
import { HeaderAdmin } from '../../header-admin/header-admin';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-category-list',
  imports: [HeaderAdmin, RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService:CategoryService, private cd: ChangeDetectorRef) {}  

  ngOnInit(): void {
    this.listCategories(); // Llamamos al método para obtener la lista de categorías al inicializar el componente
  }
 
  listCategories() {
    this.categoryService.getCategoryList().subscribe({
      next: (data) => {
        this.categories = data;
        this.cd.detectChanges(); // Forzar la detección de cambios
        console.log('List of categories', this.categories); // Mostrar por consola la lista de categorías obtenida
      },
      error: (err) => {
        console.error('Error fetching list of categories', err);
      }
    });
  }

  deleteCategoryById(id: number) {
    console.log('ID de la categoría a eliminar: ' + id);

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
            this.categoryService.deleteCategory(id).subscribe(
              () => this.listCategories() // Volvemos a cargar la lista de categorías después de borrar una
            );
            Swal.fire({
            title: "Categoría",
            text: "Categoría eliminada exitosamente.",
            icon: "success"
          });
        });
  }

}