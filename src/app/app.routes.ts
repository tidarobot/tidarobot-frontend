import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/layout/main-page/main-page').then(m => m.MainPage),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'reservations',
        loadComponent: () => import('./pages/reservations/reservations').then(m => m.Reservations)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then(m => m.Profile)
      },
      {
        path: 'admin',
        loadComponent: () => import('./pages/admin/admin').then(m => m.Admin),
        canActivate: [adminGuard]
      },
      {
        path: 'stats',
        loadComponent: () => import('./pages/stats/stats').then(m => m.Stats)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];