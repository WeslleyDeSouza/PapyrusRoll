import { EventEmitter, Injectable } from '@angular/core';

interface ISession {
  user: {};
}

@Injectable({
  providedIn: 'platform',
})
export class AuthSessionStore {
  session!: Partial<ISession>;
  constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class AuthSessionFacade {
  readonly stateChange$: EventEmitter<boolean> = new EventEmitter();

  constructor(protected store: AuthSessionStore) {}

  sessionSet(session: Partial<ISession>) {
    this.store.session = session;
    this.stateChange$.emit(!!this.sessionGet());
  }

  sessionGet() {
    return this.store.session;
  }
}
