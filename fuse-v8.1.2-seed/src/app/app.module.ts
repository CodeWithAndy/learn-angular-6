import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { fuseConfig } from 'app/fuse-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { DashboardModule } from 'app/main/dashboard/dashboard.module';
import { MarketviewModule } from './main/marketview/marketview.module';
import { LicenseManager } from 'ag-grid-enterprise';
import { SharedModule } from './shared/shared.module';
import { StrategyModule } from './main/strategy/strategy.module';
import { GroupManagerModule } from './main/group-manager/group-manager.module';
import { UserPreferenceModule } from './main/user-preference/user-preference.module';
import { TotalPriceComparisonModule } from './main/total-price-comparison/total-price-comparison.module';

const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'dashboard'
    }
];

/* AG-GRID ENTERPRISE LICENSE */
LicenseManager.setLicenseKey('Atpco_MultiApp_2Devs29_August_2019__MTU2NzAzMzIwMDAwMA==20cd62cea5cb6f4ce0229eae696c262f');

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        // General modules
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        // Translate module
        TranslateModule.forRoot(), // TODO: remove if not using translation

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule, // TODO: remove if not using fuse progress bar
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        SharedModule,
        LayoutModule, // TODO: remove unused layouts
        DashboardModule,
        MarketviewModule,
        StrategyModule,
        GroupManagerModule,
        UserPreferenceModule,
        TotalPriceComparisonModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
