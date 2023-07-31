import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { User } from "src/app/models";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private fs: AngularFirestore) {
  }

  userData() {
    const userId = localStorage.getItem('uid')
    return this.fs.collection<User>('users').doc(`${userId}`).valueChanges()
  }
}
