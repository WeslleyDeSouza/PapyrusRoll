import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  standalone: true,
  host: {
    class: 'w-100',
  },
})
export class FooterComponent {}
