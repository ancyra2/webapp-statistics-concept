import { Component } from '@angular/core';
import { PieChartComponent } from '../shared/google-charts/pie-chart/pie-chart.component';
import { DescriptiveTableComponent } from '../shared/descriptive-table/descriptive-table.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-components',
  standalone: true,
  imports: [ DescriptiveTableComponent, PieChartComponent, MatCardModule],
  templateUrl: './components.component.html',
  styleUrl: './components.component.scss'
})
export class ComponentsComponent {

}
