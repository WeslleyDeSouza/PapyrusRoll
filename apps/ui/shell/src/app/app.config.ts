import {
  ApplicationConfig,
  importProvidersFrom,
  Optional,
  provideZoneChangeDetection,
  SkipSelf,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { CORE_INJECTION_TOKEN_FACTORY } from '@wes/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),
    CORE_INJECTION_TOKEN_FACTORY.provideAuthEventFactory(),
  ],
};
