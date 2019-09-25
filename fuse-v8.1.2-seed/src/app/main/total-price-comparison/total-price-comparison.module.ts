import { NgModule } from '@angular/core';
import { TotalPriceComparisonComponent } from './total-price-comparison.component';
import { RouterModule } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';
import { SharedModule } from 'app/shared/shared.module';

const routes = [
    {
        path: 'total-price-comparison',
        component: TotalPriceComparisonComponent
    }
];

@NgModule({
  declarations: [TotalPriceComparisonComponent],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    FuseSidebarModule,
    SharedModule
  ],
  exports: [TotalPriceComparisonComponent]

})
export class TotalPriceComparisonModule { }
