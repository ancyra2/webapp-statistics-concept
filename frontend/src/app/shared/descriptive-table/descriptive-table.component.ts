import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  variable: string;
  minStatistic: number;
  maxStatistic: number;
  meanStatistic: number;
}

@Component({
  selector: 'app-descriptive-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './descriptive-table.component.html',
  styleUrl: './descriptive-table.component.scss'
})

export class DescriptiveTableComponent {

  ELEMENT_DATA: PeriodicElement[] = [
    { variable: "Turkey", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    { variable: "Russia", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    { variable: "France", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    { variable: "United States", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    { variable: "Canada", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    { variable: "Turkey", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    { variable: "Russia", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    { variable: "France", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    { variable: "United States", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    { variable: "Canada", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    { variable: "Turkey", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    { variable: "Russia", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    { variable: "France", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    { variable: "United States", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    { variable: "Canada", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    
  ];

  displayedColumns: string[] = ['variable', 'min', 'max', 'mean'];
  dataSource = this.ELEMENT_DATA;
}
