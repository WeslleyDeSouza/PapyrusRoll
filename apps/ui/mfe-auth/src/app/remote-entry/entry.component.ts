import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'pyrl-mfeAuth-entry',
  template: `<pyrl-nx-welcome></pyrl-nx-welcome>`,
})
export class RemoteEntryComponent {}
