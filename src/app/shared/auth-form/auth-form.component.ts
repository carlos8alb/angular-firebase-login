import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { AuthService } from '../../pages/users/services/auth.service';
import { Observable } from 'rxjs';

const actionType = {
  signIn: {
    action: 'signIn',
    title: 'Sign In',
  },
  signUp: {
    action: 'signUp',
    title: 'Sign Up',
  },
} as const;

type ActionType = keyof typeof actionType;

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './auth-form.component.html',
})
export class AuthFormComponent implements OnInit {
  @Input() action!: ActionType;
  form!: FormGroup;
  title!: string;

  private readonly fb = inject(FormBuilder);
  private readonly emailPattern: RegExp =
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  private readonly authService = inject(AuthService)
  user$!: Observable<unknown>

  ngOnInit(): void {
    this.title =
      this.action === actionType.signIn.action
        ? actionType.signIn.title
        : actionType.signUp.title;

    this.initForm();
    this.user$ = this.authService.userState$
  }

  onSubmit(): void {
    const { email, password } = this.form.value;
    this.action === actionType.signIn.action
    ? this.authService.signIn(email, password)
    : this.authService.signUp(email, password)
  }

  hasError(field: string): boolean {
    const fieldName = this.form.get(field);
    return !!fieldName?.invalid && fieldName.touched;
  }

  signInGoogle(): void {
    this.authService.signInGoogle()
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
}
