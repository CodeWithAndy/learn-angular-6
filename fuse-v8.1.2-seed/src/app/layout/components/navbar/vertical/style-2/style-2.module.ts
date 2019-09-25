import { NgModule } from '@angular/core';

import { FuseNavigationModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { NavbarVerticalStyle2Component } from 'app/layout/components/navbar/vertical/style-2/style-2.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [
        NavbarVerticalStyle2Component
    ],
    imports     : [
        FuseSharedModule,
        SharedModule,
        FuseNavigationModule
    ],
    exports     : [
        NavbarVerticalStyle2Component
    ]
})
export class NavbarVerticalStyle2Module
{
}
