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
    { variable: "Sample Variable", minStatistic: 15, maxStatistic: 108, meanStatistic: 48 },
    
  ];

  displayedColumns: string[] = ['variable', 'min', 'max', 'mean'];
  dataSource = this.ELEMENT_DATA;
}
