import { Component } from '@angular/core';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';
import { SearchLinksComponent } from '../shared/search-links/search-links.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, SearchLinksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
