import { Routes } from '@angular/router';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modules/dashboard/dasboard')
            .then(m => m.Dashboard)
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./modules/products/product-list')
            .then(m => m.ProductList)
      },
      {
  path: 'categories',
  loadComponent: () =>
    import('./modules/categories/category-list')
    .then(m => m.CategoryList)
},
{
  path: 'login',
  loadComponent: () =>
    import('./modules/auth/login.component')
      .then(m => m.LoginComponent)
},


    ]
  }
];
