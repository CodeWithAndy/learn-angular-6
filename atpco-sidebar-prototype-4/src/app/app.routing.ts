import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    // data: {
    //   title: 'Home'
    // },
    children: [
      {
        path: 'search',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'web-fares',
        loadChildren: './components/components.module#ComponentsModule'
      },
      {
        path: 'market-view-by-fare',
        loadChildren: './icons/icons.module#IconsModule'
      },
      {
        path: 'total-price-comparison',
        loadChildren: './forms/forms.module#FormsModule'
      },
      {
        path: 'change-monitoring',
        loadChildren: './plugins/plugins.module#PluginsModule'
      },
      {
        path: 'total-price-by-fare',
        loadChildren: './widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'total-price-by-date',
        loadChildren: './chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'udg',
        loadChildren: './uikits/uikits.module#UIKitsModule'
      }
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
