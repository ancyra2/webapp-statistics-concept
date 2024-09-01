import { Component } from '@angular/core';
import { SearchBarComponent } from '../shared/search-bar/search-bar.component';
import { SearchLinksComponent } from '../shared/search-links/search-links.component';
import { HeroComponent } from './hero/hero.component';
import { CardStatisticsComponent } from '../shared/card-statistics/card-statistics.component';
import { LastStudiesComponent } from '../shared/last-studies/last-studies.component';
import { CarouselComponent } from '../shared/carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchBarComponent, SearchLinksComponent,HeroComponent,
    CardStatisticsComponent, LastStudiesComponent,CarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
