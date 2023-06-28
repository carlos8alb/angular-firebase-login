import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { Routes, provideRouter } from '@angular/router';
import { authGuard } from '@app/shared/guards/auth.guard';
import { onlyLoggedInGuard } from '@app/shared/guards/only-logged-in.guard';

const routes: Routes = [
  {
    path: 'user/sign-up',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@app/pages/users/sign-up/sign-up.component').then(
        (c) => c.SignUpComponent
      ),
  },
  {
    path: 'user/sign-in',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@app/pages/users/sign-in/sign-in.component').then(
        (c) => c.SignInComponent
      ),
  },
  {
    path: 'user/profile',
    canActivate: [onlyLoggedInGuard],
    loadComponent: () =>
      import('@app/pages/users/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
  },
  {
    path: 'user/email-verification',
    loadComponent: () =>
      import('@app/pages/users/email-verification/email-verification.component').then(
        (c) => c.EmailVerificationComponent
      ),
  },
  {
    path: 'user/forgot-password',
    loadComponent: () =>
      import('@app/pages/users/forgot-password/forgot-password.component').then(
        (c) => c.ForgotPasswordComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('@app/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
];

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => {
            const auth = getAuth();
            //connectAuthEmulator(auth, 'http://localhost:9099', {
            //  disableWarnings: true,
            //});
            return auth;
        }), provideFirestore(() => {
            const fireStore = getFirestore();
            //connectFirestoreEmulator(fireStore, 'http://localhost', 9098)
            return fireStore;
        })),
        provideHttpClient(),
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));
