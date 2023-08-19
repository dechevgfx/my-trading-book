import { Component, OnInit } from '@angular/core';
import { Trade, User } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { TradeService, UserService } from 'src/app/services';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  selectedTrade: Trade | undefined;
  isLiked: boolean = false;
  private userUid: string | null = null; // Store the user UID here

  constructor(
    private route: ActivatedRoute,
    private tradeService: TradeService,
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



}
