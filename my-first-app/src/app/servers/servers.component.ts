import { Component, OnInit } from '@angular/core';

@Component({ // CLI - ng g c {{name}} or ng generate component {{name}} to generate component
  selector: 'app-servers', // ELEMENT SELECTOR FOR COMPONENTS
  // selector: '[app-servers]',  // ATTRIBUTE SELECTOR
  // selector: '.app-servers',   // CLASS SELECTOR
  // template: `
  //   <app-server></app-server>
  //   <app-server></app-server>`, // MUST HAVE TEMPLATE OR TEMPLATE URL, BACKTICK FOR MULTI-LINE
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Test Server';
  username = '';
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];

  constructor() {
    setTimeout(() => { // THIS with arrow function refers to ServersComponent
      this.allowNewServer = true;
    }, 2000);

    // setTimeout(function() { // THIS is function scoped
    //   this.allowNewServer = true;
    // }, 2000);
  }

  ngOnInit() {
  }

  onCreateServer() {
    const element = document.createElement('button');
    console.dir(element); // logs object
    console.log(element); // logs String
    this.serverCreationStatus = 'Server was created! ' + this.serverName;
    this.serverCreated = true;
    this.servers.push(this.serverName);
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value; // explicit casting example (<>)
  }

  onClear() {
    this.username = '';
  }

}
