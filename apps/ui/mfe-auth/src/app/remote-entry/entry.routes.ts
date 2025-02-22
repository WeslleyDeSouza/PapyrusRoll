import { Route } from '@angular/router';
import { RemoteEntryAuthComponent } from './entry.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntryAuthComponent,
    children: [
      {
        path: 'password-reset',
        loadComponent: () =>
          import('./pages/password-forget/auth-password-forget.component').then(
            (com) => com.AuthPasswordForgetComponent
          ),
      },
      {
        path: '',
        loadComponent: () =>
          import('./pages/login/auth-login.component').then(
            (com) => com.AuthLoginComponent
          ),
      },
    ],
  },
];
