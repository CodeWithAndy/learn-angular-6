import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports     : [
        RouterModule,
        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,
        SharedModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
}
