import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LastStudiesComponent } from '../last-studies/last-studies.component';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, LastStudiesComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
 @Input() width: string = '100%'; 
 @Input() height: string = '300px'; 
}
