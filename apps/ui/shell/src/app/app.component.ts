import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {LayoutComponent} from "@wes/core";

@Component({
  imports: [ RouterModule,  LayoutComponent],
  selector: 'pyrl-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'uiShell';
}
