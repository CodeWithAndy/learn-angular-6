import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountService] // HIERARCHAL INJECTOR - will inject same instance to child components if provider not repeated in child component
})
export class AppComponent implements OnInit {
  accounts: {name: string, status: string}[] = [];

  constructor(private accountService: AccountService) {}

  // initialization code done here not constructor
  ngOnInit() {
    this.accounts = this.accountService.accounts;
  }
}
