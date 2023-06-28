import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => {
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
        provideHttpClient()
    ]
})
  .catch(err => console.error(err));
