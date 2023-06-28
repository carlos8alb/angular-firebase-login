import { Component } from '@angular/core';
import { AuthFormComponent } from '../../../shared/auth-form/auth-form.component';

@Component({
    selector: 'app-sign-in',
    template: `<app-auth-form [action]="'signIn'"></app-auth-form>`,
    standalone: true,
    imports: [AuthFormComponent]
})
export class SignInComponent {

}
