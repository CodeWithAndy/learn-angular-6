import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MarketviewComponent } from './marketview.component';
import { RouterModule } from '@angular/router';
import { FuseSidebarModule } from '@fuse/components';
import {
        SnackbarExampleComponent
} from './snackbar-example.component';
import { SaveDialogComponent } from './save-dialog/save-dialog.component';
import { SharedModule } from 'app/shared/shared.module';

const routes = [
    {
        path: 'market-view',
        component: MarketviewComponent
    }
];

@NgModule({
    declarations: [
        MarketviewComponent,
        SnackbarExampleComponent,
        SaveDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        FuseSidebarModule,
        SharedModule
    ],
    exports: [MarketviewComponent],
    entryComponents: [SnackbarExampleComponent, SaveDialogComponent]
})
export class MarketviewModule {}
