import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import { routes } from "src/app/consts";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { TradeService } from 'src/app/services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user = this.userSubject.asObservable();
  public routers: typeof routes = routes;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AngularFireAuth,
    private fs: AngularFirestore,
    private tradeService: TradeService
  ) {
  }

  login(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).then((data) => {
      localStorage.setItem('uid', data.user?.uid!)
      this.saveUserDataToStore(data.user)
      this.router.navigate([this.routers.DASHBOARD]);
    })
  }

  loginGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((data) => {
      localStorage.setItem('uid', data.user?.uid!)
      this.saveUserDataToStore(data.user)
      this.tradeService.setUserId(data.user?.uid!);
      this.router.navigate([this.routers.DASHBOARD]);
    });
  }

  signIn(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).then((data) => {
      localStorage.setItem('uid', data.user?.uid!)
      this.saveUserDataToStore(data.user)
      this.tradeService.setUserId(data.user?.uid!);
      this.router.navigate([this.routers.DASHBOARD]);
    })
  }

  logout() {
    this.auth.signOut().then(() => {
      localStorage.removeItem('uid')
      localStorage.removeItem('user')
      this.tradeService.setUserId(null);
      this.router.navigate([this.routers.LOGIN]);
    })
  }

  saveUserDataToStore(user: firebase.User | null) {
    this.fs.collection('users').doc(`${user?.uid}`).set({
      uid: user?.uid,
      email: user?.email,
    }, {merge: true})
  }

  resetPassword(email: string) {
    this.auth.sendPasswordResetEmail(email).then(() => {
      // Handle success (e.g., show a message or redirect to login page)
      console.log('Password reset email sent successfully.');
    }).catch((error) => {
      // Handle error (e.g., show an error message)
      console.error('Error sending password reset email:', error);
    });
  }

}
