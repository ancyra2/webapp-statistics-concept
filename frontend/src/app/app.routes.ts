import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { PanelComponent } from './admin-layout/panel/panel.component';
import { HomeComponent } from './main-layout/home/home.component';
import { ReportComponent } from './main-layout/report/report.component';
import { ComponentsComponent } from './main-layout/components/components.component';
import { PagesComponent } from './admin-layout/pages/pages.component';
import { StatisticsComponent } from './main-layout/statistics/statistics.component';
import { LatestComponent } from './main-layout/latest/latest.component';
import { FootballStatsComponent } from './main-layout/football-stats/football-stats.component';
import { ContentsComponent } from './admin-layout/contents/contents.component';

export const routes: Routes = [
  {
    path:'',
    component: MainLayoutComponent,
    children:[
      {path: '', component: HomeComponent },
      {path: 'reports', component: ReportComponent },
      {path: 'components', component: ComponentsComponent },
      {path: 'statistics', component: StatisticsComponent},
      {path: 'latest', component: LatestComponent},
      {path: 'statistics/football', component: FootballStatsComponent},
    ]
  },
  {
    path:'admin',
    component: AdminLayoutComponent,
    children:[
      {path: '', component: PanelComponent},
      {path: 'pages', component: PagesComponent},
      {path: 'contents', component: ContentsComponent}
    ]
  }
   
];
