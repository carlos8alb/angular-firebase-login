import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { AuthFormComponent } from '@app/shared/auth-form/auth-form.component';


@NgModule({
    imports: [
        CommonModule,
        SignInRoutingModule,
        AuthFormComponent,
        SignInComponent
    ]
})
export class SignInModule { }
