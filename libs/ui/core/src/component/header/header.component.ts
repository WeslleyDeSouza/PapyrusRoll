import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true,
  host: {
    class: 'w-100',
  },
})
export class HeaderComponent {}
