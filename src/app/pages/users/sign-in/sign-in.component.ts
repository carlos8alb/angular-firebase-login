import { Component } from '@angular/core';
import { AuthFormComponent } from '../../../shared/auth-form/auth-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  template: `<app-auth-form [action]="'signIn'"></app-auth-form>`,
  standalone: true,
  imports: [
    AuthFormComponent,
    CommonModule,
    AuthFormComponent,
  ],
})
export class SignInComponent {}
