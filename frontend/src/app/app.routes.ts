import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  {
    path: 'transacciones',
    loadComponent: () =>
      import('./components/transactions/transactions').then((m) => m.Transactions),
  },
  {
    path: 'categorias',
    loadComponent: () => import('./components/categories/categories').then((m) => m.Categories),
  },
  { path: '**', redirectTo: 'dashboard' },
];
