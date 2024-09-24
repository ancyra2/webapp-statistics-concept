import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { LastStudiesComponent } from "../../shared/last-studies/last-studies.component";
import { MatTableDataSource } from '@angular/material/table';

interface CardStatistics{
  cardImg: string;
  cardHeader: string;
  cardContent: string;
}
@Component({
  selector: 'app-latest',
  standalone: true,
  imports: [MatPaginatorModule, LastStudiesComponent],
  templateUrl: './latest.component.html',
  styleUrl: './latest.component.scss'
})
export class LatestComponent implements AfterViewInit{
  
@ViewChild(MatPaginator) paginator!: MatPaginator;

  cardData: Array<CardStatistics> = [
    {cardImg: "c1.jpg", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c2.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c3.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c4.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c2.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c3.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c1.jpg", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c2.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c3.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c4.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c4.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c2.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c3.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c1.jpg", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c2.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c3.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c4.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c2.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c3.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c2.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c3.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c1.jpg", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c2.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c3.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c4.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c2.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c3.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c1.jpg", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c2.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c3.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c4.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c2.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c3.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c1.jpg", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c2.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c3.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },
    {cardImg: "c2.png", cardHeader: "Statistic Field", cardContent: "Leading semiconductor companies worldwide as of August 18, 2024, by market capitalization" },

  ]

  dataSource = new MatTableDataSource(this.cardData)

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.updatePageData();
  }

  paginatedData: CardStatistics[] = [];
  pageSize = 12;

  updatePageData() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedData = this.cardData.slice(startIndex, endIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
