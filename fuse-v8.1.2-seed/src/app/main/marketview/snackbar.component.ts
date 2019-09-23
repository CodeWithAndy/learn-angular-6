import { Component } from '@angular/core';

@Component({
    selector: 'snack-bar-component-example-snack',
    template: `<span class="example-pizza-party">
                    Save Example
                </span>`,
    styles: [`
      .example-pizza-party {
        color: white;
      }
    `],
  })
  export class PizzaPartyComponent {}