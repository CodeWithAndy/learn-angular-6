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
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // setValue() object must match exact form object, this will set value for all controls
    // this.form.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // });
    // patch will only set value for part of the form and not override everything else
    this.form.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }

  // LOCAL REFERENCE APPROACH
  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  // VIEWCHILD APPROACH
  onSubmit() {
    this.submitted = true;
     this.user.username = this.form.value.userData.username;
     this.user.email = this.form.value.userData.email;
     this.user.secretQuestion = this.form.value.secret;
     this.user.answer = this.form.value.questionAnswer;
     this.user.gender = this.form.value.gender;

     this.form.reset();
  }
}
