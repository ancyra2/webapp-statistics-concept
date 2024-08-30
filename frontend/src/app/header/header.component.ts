import { Component } from '@angular/core';
import { LogoComponent } from './logo/logo.component';
import { MenubarComponent } from './menubar/menubar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LogoComponent, MenubarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
