import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { PanelComponent } from './admin-layout/panel/panel.component';
import { HomeComponent } from './main-layout/home/home.component';
import { ReportComponent } from './main-layout/report/report.component';
import { ComponentsComponent } from './main-layout/components/components.component';
import { PagesComponent } from './admin-layout/pages/pages.component';

export const routes: Routes = [
    {
        path:'',
        component: MainLayoutComponent,
        children:[
            {path: '', component: HomeComponent },
            {path: 'home', component: HomeComponent },
            {path: 'reports', component: ReportComponent },
            {path: 'components', component: ComponentsComponent },
        ]
    },
    {
        path:'admin',
        component: AdminLayoutComponent,
        children:[
            {path: '', component: PanelComponent},
            {path: 'pages', component: PagesComponent}
        ]
    }
   
];
