import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css'] // EXTERNAL CSS
  styles: [`
    h3 {
      color: dodgerblue;
    }
    .white-text {
      color: white;
    }
  `] // INLINE CSS
})
export class AppComponent {
  showSecret = false;
  logs = [];
  numbers: number[] = [];

  constructor() {

  }

  onDisplayDetails() {
    this.showSecret = !this.showSecret;
    this.logs.push(this.logs.length + 1);
  }

  onStartInterval(value) {
    console.log(value.interval);
    this.numbers.push(value.interval);
  }
}
