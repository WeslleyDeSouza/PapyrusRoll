import { Injectable } from '@angular/core';

interface ISession {
  user: {};
}

@Injectable({
  providedIn: 'platform',
})
export class AuthSessionStore {
  session!: Partial<ISession>;

  constructor() {
    this.autoLoader();
  }

  // todo replace autoLoader with a real implementation
  private autoLoader() {
    // simple loader
    this.session = sessionStorage.getItem('app.session')
      ? {}
      : (undefined as any as ISession);
  }
}
