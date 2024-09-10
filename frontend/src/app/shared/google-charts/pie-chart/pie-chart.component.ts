import { Component, OnInit } from '@angular/core';

declare var google: any;  // Google Charts'ın global API'sine erişmek için

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit{

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
      ['Getir', 27.5],
      ['Yemeksepeti', 22.5],
      ['Trendyol Yemek', 35],
      ['Migros Yemek', 15],
    ]);

    const options = {
      title: 'Electronic Food Market Share',
      pieHole: 0.4,
    };

    const chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }
}



