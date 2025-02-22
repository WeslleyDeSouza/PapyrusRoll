import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'uiDoc',
    loadChildren: () => import('uiDoc/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'uiAuth',
    loadChildren: () => import('uiAuth/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '**',
    component: NxWelcomeComponent,
  },
];
