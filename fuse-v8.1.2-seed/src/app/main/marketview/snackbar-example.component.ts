import { Component } from '@angular/core';

@Component({
    selector: 'snack-bar-example',
    template: `<div class="snack-bar-example">
                    <mat-icon>save</mat-icon><span class="p-8">Save Successful</span>
                </div>`,
    styles: [`
      .snack-bar-example mat-icon {
        vertical-align: sub;
      }
    `],
  })
  export class SnackbarExampleComponent {}