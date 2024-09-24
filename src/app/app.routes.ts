import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@star-wars-app/star-wars').then((m) => m.StarWarsComponent)
  }
];
