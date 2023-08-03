import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Injectable } from "@angular/core";
import { Trade } from "src/app/models/trade";
import firebase from 'firebase/compat/app'; // Step 1: Import firebase namespace

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  userId: string | null
  date: string = firebase.firestore.Timestamp.now().toDate().toLocaleString();
  constructor(private fs: AngularFirestore) {
    this.userId = localStorage.getItem('uid')
  }


  getAll() {
    return this.fs.collection<Trade>(`trades`).valueChanges({ idField: 'id' })
  }

  create(trade: Trade) {
    const newTrade = { ...trade, userId: this.userId, date: this.date }
    return this.fs.collection<Trade>(`trades`).add(<Trade><unknown>newTrade)
  }

  setUserId(userId: string | null) {
    this.userId = userId;
  }

  update(trade: Trade) {
    return this.fs.collection<Trade>(`trades`).doc(`${trade.id}`).set(trade, { merge: true })
  }


  delete(trade: Trade) {
    return this.fs.collection<Trade>(`trades`).doc(`${trade.id}`).delete()
  }

  getTradesCreatedByCurrentUser() {
    return this.fs.collection<Trade>(`trades`, ref => ref.where('userId', '==', this.userId)).valueChanges({ idField: 'id' });
  }

  getTradesLikedByCurrentUser() {
    return this.fs.collection<Trade>(`trades`, ref => ref.where('likedBy', 'array-contains', this.userId)).valueChanges({ idField: 'id' });
  }

  like(trade: Trade) {

    if (!trade.likedBy) {
      trade.likedBy = [];
    }
    if (!trade.likedBy.includes(this.userId?.toString() as string)) {
      trade.likedBy.push(this.userId?.toString() as string);
      console.log("success");
    } else {
      console.log("already liked");
      return;
    }
    return this.fs.collection<Trade>('trades').doc(trade.id).set(trade, { merge: true });
  }

  disLike(trade: Trade) {
    if (!trade.likedBy) {
      console.log("No likes to remove.");
      return;
    }

    const userId = this.userId?.toString() as string;
    const index = trade.likedBy.indexOf(userId);

    if (index === -1) {
      console.log("You have not liked this trade.");
      return;
    }

    trade.likedBy.splice(index, 1);
    console.log("Successfully unliked.");

    return this.fs.collection<Trade>('trades').doc(trade.id).set(trade, { merge: true });
  }

}
