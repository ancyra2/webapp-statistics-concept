import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PieChartComponent } from '../../shared/google-charts/pie-chart/pie-chart.component';
import { DescriptiveTableComponent } from '../../shared/descriptive-table/descriptive-table.component';
import { ReportCardComponent } from '../../shared/report-card/report-card.component';
import { RankingComponent } from '../../shared/reports/ranking/ranking.component';

// eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
declare var google: any;

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [PieChartComponent, MatCardModule, DescriptiveTableComponent, ReportCardComponent, RankingComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent  implements OnInit{

  ngOnInit(): void {
    this.loadGoogleCharts();
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
