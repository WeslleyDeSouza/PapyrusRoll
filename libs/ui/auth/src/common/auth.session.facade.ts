import { EventEmitter, Injectable } from '@angular/core';
import { AuthSessionStore } from './';
import { BehaviorSubject, Observable } from 'rxjs';

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
  readonly state$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly stateChange$: Observable<boolean> = this.state$.asObservable();

  /**
   * Creates an instance of AuthSessionFacade.
   * @param store - The authentication session store service
   */
  constructor(protected store: AuthSessionStore) {
    this.autoLoader();
  }

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
    this.state$.next(this.isLoggedIn);
    sessionStorage.setItem('app.session', '1');
  }

  /**
   * Retrieves the current session data from the store.
   * @returns {ISession | undefined} The current session data or undefined if no session exists
   */
  sessionGet(): Partial<ISession> | undefined {
    return this.store.session;
  }

  private autoLoader() {
    // simple loader
    let session = sessionStorage.getItem('app.session')
      ? {}
      : (undefined as any as ISession);

    if (session) this.sessionSet(session);
  }
}
