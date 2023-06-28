import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ForgotPasswordRoutingModule,
        ReactiveFormsModule,
        ForgotPasswordComponent
    ]
})
export class ForgotPasswordModule { }
