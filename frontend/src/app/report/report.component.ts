import { Component } from '@angular/core';
import { DescriptiveTableComponent } from '../shared/descriptive-table/descriptive-table.component';
@Component({
  selector: 'app-report',
  standalone: true,
  imports: [ DescriptiveTableComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

}
