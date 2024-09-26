import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-links',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './search-links.component.html',
  styleUrl: './search-links.component.scss'
})
export class SearchLinksComponent {

}
