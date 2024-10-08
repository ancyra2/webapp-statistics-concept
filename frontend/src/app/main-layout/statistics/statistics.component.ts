import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PieChartComponent } from "../../shared/google-charts/pie-chart/pie-chart.component";
import { CommonModule } from '@angular/common';
import { DescriptiveTableComponent } from "../../shared/descriptive-table/descriptive-table.component";
import { GeoChartComponent } from "../../shared/google-charts/geo-chart/geo-chart.component";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, PieChartComponent, CommonModule, DescriptiveTableComponent, GeoChartComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  dataDetailIndex = 0;

  setDetailIndex (index: number){
    this.dataDetailIndex = index;
  }
}

