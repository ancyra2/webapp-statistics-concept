import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-last-studies',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './last-studies.component.html',
  styleUrl: './last-studies.component.scss'
})
export class LastStudiesComponent {
  @Input() imgSrc: string = "";
  @Input() content: string = "";
  @Input() contentHeader: string = "";
}
