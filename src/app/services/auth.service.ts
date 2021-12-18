import firebase from 'firebase/compat/app';
import {cfaSignIn, cfaSignInGoogle} from 'capacitor-firebase-auth';
import { Injectable } from '@angular/core';
//import { FirebaseApp as firebase } from '@angular/fire/app';
//import { firebase, FirebaseApp } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }
  /*
  signInWithGoogle(): firebase.Promise<any> {
    return this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }*/


  public loginWithGoogle(){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  public loginWithFacebook(){
    this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  public logout() : Observable<any> {
    return from(this.auth.signOut());
  }

}
