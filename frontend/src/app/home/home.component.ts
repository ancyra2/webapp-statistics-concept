import { Component } from '@angular/core';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';
import { SearchLinksComponent } from '../shared/search-links/search-links.component';
import { HeroComponent } from './hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, SearchLinksComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
