import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-card-statistics',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card-statistics.component.html',
  styleUrl: './card-statistics.component.scss'
})
export class CardStatisticsComponent {
@Input() imgSrc : string = "";
@Input() content: string = "";
@Input() contentHeader: string = "";  
}
