import { EventEmitter, Injectable } from '@angular/core';
import { AuthSessionStore } from './';

interface ISession {
  user: {};
}

/**
 * Facade for managing authentication session state.
 * Provides an interface to interact with the auth session store and emits state changes.
 */
@Injectable({
  providedIn: 'platform',
})
export class AuthSessionFacade {
  /**
   * Event emitter that broadcasts authentication state changes.
   * Emits true when user is logged in, false otherwise.
   */
  readonly stateChange$: EventEmitter<boolean> = new EventEmitter();

  /**
   * Creates an instance of AuthSessionFacade.
   * @param store - The authentication session store service
   */
  constructor(protected store: AuthSessionStore) {}

  /**
   * Checks if the user is currently logged in.
   * @returns {boolean} True if a session exists, false otherwise
   */
  get isLoggedIn(): boolean {
    return !!this.sessionGet();
  }

  /**
   * Updates the session data in the store and emits the new authentication state.
   * @param session - Partial session data to update
   */
  sessionSet(session: Partial<ISession>): void {
    this.store.session = session;
    this.stateChange$.emit(this.isLoggedIn);
    sessionStorage.setItem('app.session', '1');
  }

  /**
   * Retrieves the current session data from the store.
   * @returns {ISession | undefined} The current session data or undefined if no session exists
   */
  sessionGet(): Partial<ISession> | undefined {
    return this.store.session;
  }
}
