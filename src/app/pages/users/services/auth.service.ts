import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from 'firebase/auth';
import { Observable } from 'rxjs';

interface errorResponse {
  code: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly googleProvider = new GoogleAuthProvider();

  constructor() {
    //this.signOut()
  }

  get userState$(): Observable<User | null> {
    return authState(this.auth);
  }

  async signInGoogle(): Promise<void> {
    try {
      await signInWithRedirect(this.auth, this.googleProvider);
    } catch (error) {
      const { code } = error as FirebaseError;
      throw new Error(code);
    }
  }

  async signUp(email: string, password: string): Promise<void> {
    try {
      // Create account
      const { user } = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      // Send email
      await this.sendEmailVerification(user);

      // Redirect welcome component
      this.router.navigate(['/user/email-verification']);
    } catch (error: unknown) {
      const { code } = error as FirebaseError;
      throw new Error(code);
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      const { user } = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.isUserVerified(user);
      this.router.navigate(['/user/profile']);
    } catch (error: unknown) {
      const { code } = error as FirebaseError;
      throw new Error(code);
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error: unknown) {
      const { code } = error as FirebaseError;
      throw new Error(code);
    }
  }

  async sendEmailVerification(user: User): Promise<void> {
    try {
      if (user) await sendEmailVerification(user);
    } catch (error: unknown) {
      const { code } = error as FirebaseError;
      throw new Error(code);
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: unknown) {
      const { code } = error as FirebaseError;
      throw new Error(code);
    }
  }

  private isUserVerified(user: User): void {
    const { emailVerified } = user;
    const route = emailVerified ? '/user/profile' : '/user/email-verification';
    this.router.navigate([route]);
  }
}
