import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { CORE_INJECTION_TOKEN } from '@wes/core';
import { AuthSessionFacade } from '@wes/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    {
      provide: CORE_INJECTION_TOKEN.authEvent,
      useClass: AuthSessionFacade,
    },
  ],
};
