import { NgModule } from '@angular/core';
import { GroupManagerComponent } from './group-manager.component';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedModule } from 'app/shared/shared.module';

const routes = [
    {
        path     : 'group-manager',
        component: GroupManagerComponent
    }
];

@NgModule({
  declarations: [GroupManagerComponent],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    SharedModule
  ],
  exports: [
    GroupManagerComponent
  ]
})
export class GroupManagerModule { }
