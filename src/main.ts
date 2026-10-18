import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { Home } from './app/components/home/home';
import { ProductList } from './app/components/product-list/product-list';
import { ProductAdd } from './app/components/product-add/product-add';
import { CategoryList } from './app/components/category/category-list/category-list';
import { CategoryAdd } from './app/components/category/category-add/category-add';
import { DetailProduct } from './app/components/cart/detail-product/detail-product';
import { SumaryOrder } from './app/components/orders/sumary-order/sumary-order';



// ✅ Definimos las rutas
const routes: Routes = [
  { path: '', component: Home },
  { path: 'admin/product', component: ProductList },
  { path: 'admin/product/addproduct', component: ProductAdd },
  { path: 'admin/product/update/:id', component: ProductAdd },
  { path: 'admin/category', component: CategoryList },
  { path: 'admin/category/add', component: CategoryAdd },
  { path: 'admin/category/update/:id', component: CategoryAdd },
  { path: 'cart/detailproduct/:id', component: DetailProduct },
  { path: 'cart/sumary', component: SumaryOrder}
];

// bootstrapApplication(App, appConfig)
//  .catch((err) => console.error(err));

// ✅ Añadimos los providers dentro del bootstrap
bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
  ],
})
.catch((err) => console.error(err));