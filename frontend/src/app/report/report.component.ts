import { Component, OnInit } from '@angular/core';
import { DescriptiveTableComponent } from '../shared/descriptive-table/descriptive-table.component';

declare var google: any;  // Google Charts'ın global API'sine erişmek için

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [ DescriptiveTableComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit{
  ngOnInit(): void {
    this.loadGoogleCharts();
  }

  loadGoogleCharts() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart = () => {
    const data = google.visualization.arrayToDataTable([
      ['Browser', 'Percentage'],
      ['Chrome', 62.74],
      ['Safari', 13.39],
      ['Firefox', 10.85],
      ['Edge', 4.67],
      ['Others', 8.35]
    ]);

    const options = {
      title: 'Browser Market Share',
      pieHole: 0.4,
    };

    const chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }
}
