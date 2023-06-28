import { inject } from '@angular/core';
import { user } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@app/pages/users/services/auth.service';
import { take, tap } from 'rxjs/operators';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userState$.pipe(
    take(1),
    tap((user): void => {
      if (user) router.navigate(['/home']);
    }),
  );
};
