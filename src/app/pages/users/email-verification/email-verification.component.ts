import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from 'firebase/auth';
import { map, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
})
export class EmailVerificationComponent {
  private readonly authService = inject(AuthService);
  user$: Observable<User | null> = this.authService.userState$;
  currentUser!: User | null;

  constructor() {
    this.user$
      .pipe(
        take(1),
        map((authState: any): User => authState?.auth?.currentUser),
        tap(() => this.authService.signOut())
      )
      .subscribe((currentUser: User) => this.currentUser = currentUser);
  }

  async onResendEmail(): Promise<void> {
    if (this.currentUser)
      await this.authService.sendEmailVerification(this.currentUser);
  }
}
