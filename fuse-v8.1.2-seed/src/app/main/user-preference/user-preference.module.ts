import { NgModule } from '@angular/core';
import { UserPreferenceComponent } from './user-preference.component';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedModule } from 'app/shared/shared.module';
import { FuseSidebarModule } from '@fuse/components';

const routes = [
    {
        path: 'user-preferences',
        component: UserPreferenceComponent
    }
];

@NgModule({
    declarations: [UserPreferenceComponent],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        FuseSidebarModule,
        SharedModule
    ],
    exports: [UserPreferenceComponent]
})
export class UserPreferenceModule {}
