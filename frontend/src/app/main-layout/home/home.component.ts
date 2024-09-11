import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { SearchLinksComponent } from '../../shared/search-links/search-links.component';
import { CardStatisticsComponent } from '../../shared/card-statistics/card-statistics.component';
import { LastStudiesComponent } from '../../shared/last-studies/last-studies.component';
import { CarouselComponent } from '../../shared/carousel/carousel.component';


interface CardStatistics{
  cardImg: string;
  cardHeader: string;
  cardContent: string;
}

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
  carouselCurrentIndex!: number;
  cardData: Array<CardStatistics> = [
    {cardImg: "c1.jpg", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c2.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c3.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c4.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
  ]
  
  currentIndexChange(currentIndex: number){
    this.carouselCurrentIndex = currentIndex;
  }
}
