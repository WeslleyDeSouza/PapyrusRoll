import { InjectionToken, Optional, SkipSelf } from '@angular/core';
import { AuthSessionFacade } from '@wes/auth';

export namespace CORE_INJECTION_TOKEN {
  export const authEvent = new InjectionToken('AUTH_EVENT');
}

export namespace CORE_INJECTION_TOKEN_FACTORY {
  export const provideAuthEventFactory = () => ({
    provide: CORE_INJECTION_TOKEN.authEvent,
    useFactory: (parent: AuthSessionFacade) => parent || AuthSessionFacade,
    deps: [[new Optional(), new SkipSelf(), AuthSessionFacade]],
  });
}
