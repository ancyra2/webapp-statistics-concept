import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-report-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.scss'
})
export class ReportCardComponent {

}
