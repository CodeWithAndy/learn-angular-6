import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MarketviewComponent } from './marketview.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FuseSidebarModule } from '@fuse/components';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

const routes = [
    {
        path     : 'market-view',
        component: MarketviewComponent
    }
];

@NgModule({
  declarations: [
    MarketviewComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FuseSharedModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    FuseSidebarModule
  ],
  exports : [
    MarketviewComponent
  ]
})
export class MarketviewModule { }
