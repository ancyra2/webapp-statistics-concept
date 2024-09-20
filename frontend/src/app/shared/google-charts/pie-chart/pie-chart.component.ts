import { Component, OnInit } from '@angular/core';
import { DataTableService } from '../../../services/data-table.service';

declare var google: any;  // Google Charts'ın global API'sine erişmek için

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit{

  data!: Array<any>;
  
  constructor(dataTableService: DataTableService) {
    this.data = dataTableService.getPieChartData('Company', 'Percentage');
    const pieData = [['Company', 'Percentage']];
    this.data.forEach(item =>{
      pieData.push([item.pieName, item.metricUnit]);
    });
    this.data = pieData;
  } 
  
  ngOnInit(): void {
    this.loadGoogleCharts();
  }

  loadGoogleCharts() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart = () => {
    const data = google.visualization.arrayToDataTable(this.data);

    const options = {
      title: 'Electronic Food Market Share',
      pieHole: 0.4,
    };

    const chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
  }
}



