import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';


export interface TopScorer {
  name: string;
  position: number;
  goals: number;
  country: string;
  role: string;
  image: string;
}


const TOP_SCORERS_DATA: TopScorer[] = [
  {position: 1, name: 'Cristiano Ronaldo', goals: 850, country: 'Portugal', role: 'Forward', image: 'ronaldo3.png'},
  {position: 2, name: 'Lionel Messi', goals: 820, country: 'Argentina', role: 'Forward', image: 'messi.png'},
  {position: 3, name: 'Neymar', goals: 767, country: 'Brazil', role: 'Forward', image: 'neymar.png'},
  {position: 4, name: 'Romário', goals: 743, country: 'Brazil', role: 'Forward', image: 'noimg.png'},
  {position: 5, name: 'Ferenc Puskás', goals: 746, country: 'Hungary', role: 'Forward', image: 'noimg.png'},
  {position: 6, name: 'Gerd Müller', goals: 735, country: 'Germany', role: 'Forward', image: 'noimg.png'},
  {position: 7, name: 'Josef Bican', goals: 805, country: 'Austria/Czechia', role: 'Forward', image: 'noimg.png'},
  {position: 8, name: 'Robert Lewandowski', goals: 560, country: 'Poland', role: 'Forward', image: 'noimg.png'},
  {position: 9, name: 'Zlatan Ibrahimović', goals: 570, country: 'Sweden', role: 'Forward', image: 'noimg.png'},
  {position: 10, name: 'Luis Suárez', goals: 510, country: 'Uruguay', role: 'Forward', image: 'noimg.png'},
];

@Component({
  selector: 'app-football-stats',
  standalone: true,
  imports: [MatIconModule, MatTableModule, CommonModule],
  templateUrl: './football-stats.component.html',
  styleUrl: './football-stats.component.scss'
})
export class FootballStatsComponent {

  displayedColumns: string[] = ['position', 'player', 'goals', 'country'];
  dataSource = TOP_SCORERS_DATA;
}
