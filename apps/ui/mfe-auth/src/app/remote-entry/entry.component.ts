import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [CommonModule, RouterOutlet],
  selector: 'pyrl-auth-entry',
  template: `<router-outlet />`,
})
export class RemoteEntryAuthComponent {}
