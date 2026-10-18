import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderAdmin } from '../../header-admin/header-admin';
import { NotificationService } from '../../../shared/notification.service';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../common/category';

@Component({
  selector: 'app-category-add',
  imports: [HeaderAdmin, FormsModule],
  templateUrl: './category-add.html',
  styleUrl: './category-add.css',
})
export class CategoryAdd implements OnInit {
  id: number = 0;
  name: string = '';

  constructor(private categoryService: CategoryService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute,
              private notification: NotificationService,
              private cd: ChangeDetectorRef) { }

  ngOnInit():void { 
    this.getCategoryById();
   }

  addCategory(): void {
    console.log('Nombre de categoria introduccido: ' + this.name);

    let category = new Category(this.id, this.name);

    this.categoryService.createCategory(category).subscribe(
      (response) => {
        console.log('Categoria añadida correctamente: ', response);
        this.notification.success('Categoria agregada correctamente');
        this.router.navigate(['/admin/category']);
      },
      (error) => {
        console.error('Error al añadir la categoría: ', error);
        this.notification.error('Error al añadir la categoría');
      }
    );
  }

  getCategoryById():void{
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if(id){
          console.log('ID de la categoría a editar: ' + id);
          this.categoryService.getCategoryById(id).subscribe(
            data => {
              this.id = data.id;
              this.name = data.name;
              this.cd.markForCheck();
            },
            error => {
              console.error('Error al obtener la categoría: ', error);
              this.notification.error('Error al obtener la categoría');
            }

          );
        }
      }
    )
  }

}
