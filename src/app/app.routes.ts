import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/post-list/post-list').then(m => m.PostList) },
  { path: 'posts/:id', loadComponent: () => import('./pages/post-detail/post-detail').then(m => m.PostDetail) },
];
