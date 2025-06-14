import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../../../home/ui/pages/home/home.page').then(
            (m) => m.HomePage
          ),
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('../../../gallery/ui/pages/gallery/gallery.page').then(
            (m) => m.GalleryPage
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../../../profile/ui/pages/profile/profile.page').then(
            (m) => m.ProfilePage
          ),
      },
      {
        path: '**',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
      path: '',
      redirectTo: 'tabs/home',
      pathMatch: 'full',
  }
];