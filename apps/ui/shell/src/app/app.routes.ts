import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { AUTH_GUARD } from '@wes/auth';

export const appRoutes: Route[] = [
  {
    path: 'uiDoc',
    loadChildren: () => import('uiDoc/Routes').then((m) => m!.remoteRoutes),
    canActivate: [AUTH_GUARD.isLoggedInUser],
  },
  {
    path: 'uiAuth',
    loadChildren: () => import('uiAuth/Routes').then((m) => m!.remoteRoutes),
    canActivate: [AUTH_GUARD.isLoggedOutUser],
  },
  {
    path: '**',
    component: NxWelcomeComponent,
    canActivate: [AUTH_GUARD.isLoggedInUser],
  },
];
