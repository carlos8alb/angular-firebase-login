import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  template: `<app-auth-form [action]="'signIn'"></app-auth-form>`
})
export class SignInComponent {

}
