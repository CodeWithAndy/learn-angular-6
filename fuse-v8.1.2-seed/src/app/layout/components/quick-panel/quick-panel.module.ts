import { NgModule } from '@angular/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { QuickPanelComponent } from 'app/layout/components/quick-panel/quick-panel.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    declarations: [
        QuickPanelComponent
    ],
    imports     : [
        MatAutocompleteModule,
        MatFormFieldModule,
        MatOptionModule,
        MatInputModule,
        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        FuseSharedModule,
    ],
    exports: [
        QuickPanelComponent
    ]
})
export class QuickPanelModule
{
}
