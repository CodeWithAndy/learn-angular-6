import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  interval: number = 0;
  timer: any;
  @Output() startInterval = new EventEmitter<{interval: number}>();

  constructor() { }

  ngOnInit() {
  }

  onStart() {
    console.log('Start');
    this.timer = setInterval(() => {
      this.startInterval.emit({ interval: this.interval++});
    }, 1000);
  }

  onEnd() {
    console.log('Stop')
    clearInterval(this.timer);
  }

}
