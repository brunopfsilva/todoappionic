import { AuthService } from './services/auth.service';
import { TaskService } from './services/task.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PopoverComponent } from './popover/popover.component';

//firebase
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { FirebaseAppModule, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import firebase from 'firebase/compat/app';

import { provideAuth,getAuth } from '@angular/fire/auth';

import { provideFirestore,getFirestore } from '@angular/fire/firestore'

@NgModule({
  declarations: [AppComponent,PopoverComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
     AppRoutingModule,
     AngularFireAuthModule,
     FirebaseAppModule,
     AngularFireModule.initializeApp(environment.firebase), 
     
     
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  TaskService,AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
