import { Component, ViewChild } from '@angular/core';
import { AdminSidebarMenuComponent } from "./layout/admin-sidebar-menu/admin-sidebar-menu.component";
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from "./layout/admin-header/admin-header.component";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, AdminSidebarMenuComponent, AdminHeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  @ViewChild(AdminSidebarMenuComponent) sidebarMenu!: AdminSidebarMenuComponent;

  handleToggleSidenav() {
    this.sidebarMenu.toggle(); // Sidebar'daki toggle fonksiyonunu çağırıyoruz
  }
}
