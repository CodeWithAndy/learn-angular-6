import { Component } from '@angular/core';

@Component({
  selector: '[app-warning]', // ATTRIBUTE SELECTOR
  template: `
    <p>Warning works!</p>`,
  styles: [`
    p {
      background-color: lightcoral;
      border: 1px solid red;
      color: white;
      padding: 20px;
    }`]
})
export class WarningComponent {

}
