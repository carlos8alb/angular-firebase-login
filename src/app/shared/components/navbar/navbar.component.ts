import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@app/pages/users/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  user$!: Observable<User | null>;

  constructor() {
    this.user$ = this.authService.userState$;
  }

  async onSignOut(): Promise<void> {
    await this.authService.signOut();
    this.router.navigate(['user/sign-in']);
  }
}
