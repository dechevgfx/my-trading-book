import { Component, OnInit } from '@angular/core';
import { Trade } from 'src/app/models';
import { LikeService } from 'src/app/services/like.service';
import { ActivatedRoute } from '@angular/router';
import { TradeService } from 'src/app/services';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  selectedTrade: Trade | undefined;
  numLikes: number = 0;
  isLiked: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private tradeService: TradeService,
    private likeService: LikeService
  ) { }

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
      this.likeService.like(this.selectedTrade);
    }
  }

}
