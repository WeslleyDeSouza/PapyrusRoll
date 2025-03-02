import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Optional,
  signal,
  WritableSignal,
} from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CORE_INJECTION_TOKEN } from '../../common';

@Component({
  selector: 'lib-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [SidebarComponent, FooterComponent, HeaderComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  isAuthenticated: WritableSignal<boolean> = signal(false);
  constructor(
    @Optional()
    @Inject(CORE_INJECTION_TOKEN.authEvent)
    authEvent: {
      stateChange$: EventEmitter<boolean>;
    }
  ) {
    authEvent?.stateChange$
      ?.pipe(takeUntilDestroyed())
      .subscribe((sessionState: boolean) =>
        this.isAuthenticated.set(sessionState)
      );
  }
}
