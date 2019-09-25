import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FooterComponent } from 'app/layout/components/footer/footer.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [
        FooterComponent
    ],
    imports     : [
        RouterModule,
        FuseSharedModule,
        SharedModule
    ],
    exports     : [
        FooterComponent
    ]
})
export class FooterModule
{
}
