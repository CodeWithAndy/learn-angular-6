import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { ContentComponent } from 'app/layout/components/content/content.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [
        ContentComponent
    ],
    imports     : [
        RouterModule,
        FuseSharedModule,
        SharedModule
    ],
    exports     : [
        ContentComponent
    ]
})
export class ContentModule
{
}
