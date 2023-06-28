import { Component } from '@angular/core';
import { AuthFormComponent } from '../../../shared/auth-form/auth-form.component';

@Component({
    selector: 'app-sign-up',
    template: `<app-auth-form [action]="'signUp'"></app-auth-form>`,
    standalone: true,
    imports: [AuthFormComponent]
})
export class SignUpComponent {

}
