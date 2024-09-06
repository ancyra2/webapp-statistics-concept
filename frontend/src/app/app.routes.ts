import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { ComponentsComponent } from './components/components.component';

export const routes: Routes = [
    {path: '', component: HomeComponent },
    {path: 'home', component: HomeComponent },
    {path: 'reports', component: ReportComponent },
    {path: 'components', component: ComponentsComponent },
];
