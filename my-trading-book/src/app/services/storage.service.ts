import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";

const USER = 'user'
const TOKEN = 'token'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {
  }

  getUser() {
    return localStorage.getItem(USER) ? localStorage.getItem(USER) : null;
  }

  setUser(user: firebase.User) {
    localStorage.setItem(USER, JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem(USER)
  }

  getToken() {
    return localStorage.getItem(TOKEN)
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN, JSON.stringify(token))
  }

  removeToken() {
    localStorage.removeItem(TOKEN)
  }

  clearStorage() {
    localStorage.clear()
  }

}
