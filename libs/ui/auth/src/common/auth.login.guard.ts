import { AuthSessionFacade } from './';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export namespace AUTH_GUARD {
  export const isLoggedInUser = () => {
    const authService = inject(AuthSessionFacade);
    const router = inject(Router);
    return authService.isLoggedIn || router.navigate(['/uiAuth']);
  };

  export const isLoggedInTenant = () => undefined;

  export const isLoggedOutUser = () => {
    const router = inject(Router);
    return !isLoggedInUser() || router.navigate(['/']);
  };
}
