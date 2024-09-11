import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DescriptiveTableComponent } from '../../shared/descriptive-table/descriptive-table.component';
import { PieChartComponent } from '../../shared/google-charts/pie-chart/pie-chart.component';
import { CardStatisticsComponent } from '../../shared/card-statistics/card-statistics.component';
import { LastStudiesComponent } from '../../shared/last-studies/last-studies.component';
import { CarouselComponent } from '../../shared/carousel/carousel.component';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { SearchLinksComponent } from '../../shared/search-links/search-links.component';


@Component({
  selector: 'app-components',
  standalone: true,
  imports: [DescriptiveTableComponent, PieChartComponent, MatCardModule, CardStatisticsComponent, LastStudiesComponent, CarouselComponent, SearchBarComponent, SearchLinksComponent],
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss'
})
export class ComponentsComponent {
  carouselCurrentIndex!: number;

  currentIndexChange(currentIndex: number){
    this.carouselCurrentIndex = currentIndex;
  }
}
