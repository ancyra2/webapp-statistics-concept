import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar-menu',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatCheckbox, FormsModule, CommonModule, MatIconModule, RouterModule],
  templateUrl: './admin-sidebar-menu.component.html',
  styleUrl: './admin-sidebar-menu.component.scss'
})
export class AdminSidebarMenuComponent {
  opened = true;
  subMenuOpened = false;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  toggle() {
    this.sidenav.toggle(); // Sidenav'ı açıp kapatıyoruz
  }

  toggleSubMenu(event: Event){
    event.preventDefault();
    this.subMenuOpened = !this.subMenuOpened;
    
  }

}