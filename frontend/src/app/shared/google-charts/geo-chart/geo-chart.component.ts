import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-geo-chart',
  standalone: true,
  imports: [],
  templateUrl: './geo-chart.component.html',
  styleUrl: './geo-chart.component.scss'
})
export class GeoChartComponent implements OnInit{
  ngOnInit() {
    google.charts.load('current', {
      packages: ['geochart'],
      mapsApiKey: 'YOUR_API_KEY', // Google Maps API anahtarınızı ekleyin
    });

    google.charts.setOnLoadCallback(this.drawRegionsMap);
  }

  drawRegionsMap() {
    const data = google.visualization.arrayToDataTable([
      ['Country', 'Popularity'],
      ['Germany', 200],
      ['United States', 300],
      ['Brazil', 400],
      ['Canada', 500],
      ['France', 600],
      ['Russia', 700],
      ['Turkey', 900]
    ]);

    const options = {
      region: 'world', // 'world' tüm dünyayı gösterir, Avrupa için '150'
      colorAxis: { colors: ['#e0f7fa', '#00796b'] },
    };

    const chart = new google.visualization.GeoChart(
      document.getElementById('regions_div')
    );

    chart.draw(data, options);
  }

}
