import { Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    ForgotPasswordComponent,
  ],
})
export class ForgotPasswordComponent implements OnInit {
  private authService = inject(AuthService);
  email!: FormControl;
  private readonly emailPattern: RegExp =
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  isEmailSent = false;

  ngOnInit(): void {
    this.initEmailField();
  }

  async onSubmit(): Promise<void> {
    try {
      await this.authService.sendPasswordResetEmail(this.email.value);
      this.isEmailSent = true;
    } catch (error: unknown) {
      this.isEmailSent = false;
      console.log('Reset password', error);
    }
  }

  private initEmailField(): void {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailPattern),
    ]);
  }

  hasError(): boolean {
    return !!this.email.invalid && this.email.touched;
  }
}
