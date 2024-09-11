import { Component, OnInit } from '@angular/core';
import { PieChartComponent } from '../shared/google-charts/pie-chart/pie-chart.component';
import { MatCardModule } from '@angular/material/card';
import { DescriptiveTableComponent } from '../shared/descriptive-table/descriptive-table.component';
import { ReportCardComponent } from "../shared/report-card/report-card.component";
import { RankingComponent } from "../shared/reports/ranking/ranking.component";
import { FootballService } from '../services/sport/football.service';
declare var google: any;
@Component({
  selector: 'app-report',
  standalone: true,
  imports: [PieChartComponent, MatCardModule, DescriptiveTableComponent, ReportCardComponent, RankingComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent  implements OnInit{
  
  personData: any;

  constructor(private footballService: FootballService) {}
  ngOnInit(): void {
    this.loadGoogleCharts();
    this.getPersonData();

  }
  getPersonData(): void{
    this.footballService.getPersonData().subscribe(data => {
      this.personData = data;
      console.log(this.personData);
    },
    error =>{
      console.log('fetch error', error)
    }
  )
  }
  loadGoogleCharts() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart = () => {
    const data = google.visualization.arrayToDataTable([
      ["Element", "Density", { role: "style" }],
      ["Copper", 8.94, "#b87333"],
      ["Silver", 10.49, "silver"],
      ["Gold", 19.30, "gold"],
      ["Platinum", 21.45, "color: #e5e4e2"]]);

    const view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
      {
        calc: "stringify",
        sourceColumn: 1,
        type: "string",
        role: "annotation"
      },
      2]);
    const options = {
      title: "Density of Precious Metals, in g/cm^3",
      width: 600,
      height: 400,
      bar: { groupWidth: "95%" },
      legend: { position: "none" },
    };
    const chart = new google.visualization.BarChart(document.getElementById('barchart_values'));
    chart.draw(data, options);
  }
}
