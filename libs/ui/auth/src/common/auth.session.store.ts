import { Injectable } from '@angular/core';

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
