import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'lib-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  imports: [
    RouterLink
  ],
  standalone: true
})
export class SidebarComponent {
  menu:{title:string,path:string}[] = []
}
