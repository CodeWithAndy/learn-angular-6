import { NgModule } from '@angular/core';
import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';

@NgModule({
    imports  : [
        FuseDirectivesModule,
        FusePipesModule
    ],
    exports  : [
        FuseDirectivesModule,
        FusePipesModule
    ]
})
export class FuseSharedModule
{
}
