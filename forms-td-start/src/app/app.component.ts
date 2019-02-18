import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') form: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  // LOCAL REFERENCE APPROACH
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  // VIEWCHILD APPROACH
  onSubmit() {
    console.log(this.form);
  }
}
