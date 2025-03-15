import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth.guard';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/ui/pages/register/register.page').then( m => m.RegisterPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/ui/pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'reset',
    loadComponent: () => import('./auth/ui/pages/reset/reset.page').then( m => m.ResetPage)
  },
  {
    path: '',
    loadChildren: () =>
      import('./shared/pages/tabs/tabs.routes').then((m) => m.routes),
    canActivate: [() => inject(AuthGuard).canActivate()],
  },



];
