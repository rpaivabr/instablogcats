import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withIncrementalHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';

const firebaseConfig = {
  projectId: "instablogcats",
  appId: "1:305471373235:web:457c7354557267bcdcd5c6",
  storageBucket: "instablogcats.firebasestorage.app",
  apiKey: "AIzaSyD0JsXAwpST3omeiT5N7-9ypyeYbdkl-l8",
  authDomain: "instablogcats.firebaseapp.com",
  messagingSenderId: "305471373235"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()), 
    provideClientHydration(withIncrementalHydration()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)), 
    provideAuth(() => getAuth()), provideFirebaseApp(() => initializeApp({ projectId: "instablogcats", appId: "1:305471373235:web:457c7354557267bcdcd5c6", storageBucket: "instablogcats.firebasestorage.app", apiKey: "AIzaSyD0JsXAwpST3omeiT5N7-9ypyeYbdkl-l8", authDomain: "instablogcats.firebaseapp.com", messagingSenderId: "305471373235" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), 
  ]
};
