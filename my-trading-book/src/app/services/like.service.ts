import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Trade } from '../models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  userId: string | null;

  constructor(private fs: AngularFirestore) {
    this.userId = localStorage.getItem('uid');
  }
  like(trade: Trade) {
    // Check if likedBy is undefined and initialize it as an array
    if (!trade.likedBy) {
      trade.likedBy = [];
      trade.likes = 0;
    }
    if (!trade.likedBy.includes(this.userId?.toString() as string)) {
      trade.likes += 1;
      trade.likedBy.push(this.userId?.toString() as string);
      console.log("success");
    } else {
      console.log("already liked");
      return;
    }
    return this.fs.collection<Trade>('trades').doc(trade.id).set(trade);
  }
}