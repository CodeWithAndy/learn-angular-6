import { Component } from "@angular/core";

@Component({ // @DECORATOR - TYPESCRIPT FEATURE
  selector: 'app-server', // UNIQUE SELECTOR
  templateUrl: './server.component.html',
  styles: [`
    .online {
      background-color: lightgrey;
    }
  `]
})
export class ServerComponent {
  serverId = 10;
  serverStatus = 'offline';

  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
