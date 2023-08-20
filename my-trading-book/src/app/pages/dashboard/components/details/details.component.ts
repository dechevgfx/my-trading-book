import { Component, OnInit } from '@angular/core';
import { Trade, User } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { TradeService, UserService } from 'src/app/services';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ElapsedTimePipe } from './elapse-time.pipe';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  selectedTrade: Trade | undefined;
  commentUser: User | undefined;
  isLiked: boolean = false;
  private userUid: string | null = null; // Store the user UID here


  constructor(
    private route: ActivatedRoute,
    private tradeService: TradeService,
    private db: AngularFireDatabase,
    private userService: UserService,
    private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userUid = user.uid;
      } else {
        this.userUid = null;
      }
    });
  }

  isLikedByUser() {
    if (this.selectedTrade !== undefined) {
      if (this.selectedTrade.likedBy.includes(this.userUid ?? '')) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  isOwner() {
    if (this.userUid == this.selectedTrade?.userId) {
      return true
    } else {
      return false
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const tradeId = params.get('id');
      if (tradeId !== null) {
        this.getTradeById(tradeId);
      }
    });
  }

  // Implement a function to get the trade by its ID
  getTradeById(tradeId: string): void {
    this.tradeService.getAll().subscribe((trades: Trade[]) => {
      this.selectedTrade = trades.find((trade: Trade) => trade.id === tradeId);
    });
  }

  like(): void {
    if (this.selectedTrade !== undefined) {
      this.tradeService.like(this.selectedTrade);
    }
  }

  dislike(): void {
    if (this.selectedTrade !== undefined) {
      this.tradeService.disLike(this.selectedTrade);
    }
  }

  // Define a variable to control whether to show the comments section
  showComments: boolean = false;

  // Define a variable to hold the new comment text
  newComment: string = '';

  // Add a comment to the selected trade
  addComment() {
    if (this.selectedTrade !== undefined && this.newComment !== '') {
      this.tradeService.addComment(this.selectedTrade, this.newComment);
      this.newComment = ''; // Clear the input field after adding the comment
    }
  }

  openComments() {
    if (this.showComments == false) {
      this.showComments = true;
    } else {
      this.showComments = false;
    }
  }


  deleteComment(selectedTrade: any, commentToDelete: any) {
    // Call the deleteComment function from TradeService
    this.tradeService.deleteComment(selectedTrade, commentToDelete);
  }

  user() {
    return this.userUid
  }
}

