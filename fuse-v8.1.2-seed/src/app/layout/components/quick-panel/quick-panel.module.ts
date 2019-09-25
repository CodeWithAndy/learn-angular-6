import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { QuickPanelComponent } from 'app/layout/components/quick-panel/quick-panel.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
    declarations: [
        QuickPanelComponent
    ],
    imports     : [
        FuseSharedModule,
        SharedModule
    ],
    exports: [
        QuickPanelComponent
    ]
})
export class QuickPanelModule
{
}
