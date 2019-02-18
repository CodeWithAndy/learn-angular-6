import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Peter', 'Danny'];

  ngOnInit() {
    // use FormBuilder for shorter syntax
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this)
        ]),
        // third parameter is for async validators
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        )
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });
    // Can subscribe to changes on individual controls or whole form
    // this.signupForm.valueChanges.subscribe(
    //   (value) => {
    //     console.log(value);
    //   }
    // );
    this.signupForm.statusChanges.subscribe(
      (status) => {
        console.log(status);
      }
    );
    this.signupForm.setValue({
      'userData': {
        'username': 'Andy',
        'email': 'testtest@test.com',
      },
      'gender': 'male',
      'hobbies': []
    });
    this.signupForm.get('userData.username').patchValue('John Doe');
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    // need to expicitly cast to form array
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    // if not equal to -1 means does not exist in array
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
