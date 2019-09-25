import { NgModule } from '@angular/core';
import { StrategyComponent } from './strategy.component';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { SharedModule } from 'app/shared/shared.module';

const routes = [
    {
        path     : 'strategy',
        component: StrategyComponent
    }
];

@NgModule({
  declarations: [StrategyComponent],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    SharedModule
  ],
  exports: [
      StrategyComponent
  ]
})
export class StrategyModule { }
