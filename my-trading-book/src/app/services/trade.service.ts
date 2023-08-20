import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Injectable } from "@angular/core";
import { Trade } from "src/app/models/trade";
import firebase from 'firebase/compat/app'; // Step 1: Import firebase namespace
import { map } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class TradeService {
  userId: string | null
  userName: string | null
  date: string = firebase.firestore.Timestamp.now().toDate().toLocaleString();
  constructor(private fs: AngularFirestore) {
    this.userId = localStorage.getItem('uid');
    this.userName = localStorage.getItem('name');
  }

  getAll() {
    return this.fs.collection<Trade>(`trades`).valueChanges({ idField: 'id' })
  }

  getAllSorted() {
    return this.fs.collection<Trade>('trades', ref => ref.orderBy('date', 'desc')).valueChanges({ idField: 'id' });
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

  getTradesCommentedByCurrentUser() {
    return this.fs.collection<Trade>('trades').valueChanges({ idField: 'id' })
      .pipe(
        map(trades => {
          const tradesCommentedByCurrentUser: Trade[] = [];
          for (const trade of trades) {
            if (trade.comments) {
              for (const comment of trade.comments) {
                if (comment.userId === this.userId) {
                  tradesCommentedByCurrentUser.push(trade);
                  break; // Exit the inner loop once a matching comment is found
                }
              }
            }
          }
          return tradesCommentedByCurrentUser;
        })
      );
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

  addComment(trade: Trade, comment: string) {
    trade.comments = trade.comments || [];
    let now = new Date();
    let formattedDate = now.toLocaleString('eu', {
      timeZone: 'Europe/Bucharest',
      hour12: false, // Display in 24-hour format
    }).replace(' GMT+3', '');
    const newComment = {
      id: (Math.random() * 1000).toString(),
      comment: comment,
      userId: this.userId?.toString() as string,
      userName: this.userName?.toString() as string,
      date: formattedDate
    };

    trade.comments.push(newComment);

    return this.fs.collection<Trade>('trades').doc(trade.id).set(trade, { merge: true });
  }

  deleteComment(selectedTrade: Trade, commentToDelete: any) {
    if (selectedTrade && selectedTrade.comments) {
      // Find the index of the comment to delete within the selected trade's comments array
      const commentIndex = selectedTrade.comments.findIndex((comment: any) => comment.id === commentToDelete.id);

      if (commentIndex !== -1) {
        // Remove the comment from the selected trade's comments array
        selectedTrade.comments.splice(commentIndex, 1);

        // Update the trade in the Firestore database to reflect the removed comment
        this.fs.collection<Trade>('trades').doc(selectedTrade.id).update({ comments: selectedTrade.comments })
          .then(() => {
            console.log('Comment deleted successfully from the database.');
          })
          .catch((error) => {
            console.error('Error deleting comment from the database:', error);
          });
      }
    }
  }

}
