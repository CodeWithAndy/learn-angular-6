import { Component } from '@angular/core';

@Component({
    selector: 'snack-bar-component-example-snack',
    template: `<div class="example-pizza-party">
                    <mat-icon>save</mat-icon><span class="p-8">Save Successful</span>
                </div>`,
    styles: [`
      .example-pizza-party mat-icon {
        vertical-align: sub;
      }
    `],
  })
  export class PizzaPartyComponent {}