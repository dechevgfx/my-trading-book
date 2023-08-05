import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Trade } from 'src/app/models/trade';
import { TradeService } from 'src/app/services';

@Component({
  selector: 'app-top-three-trades',
  templateUrl: './top-three-trades.component.html',
  styleUrls: ['./top-three-trades.component.scss']
})
export class TopThreeTradesComponent implements OnInit {
  topThreeTrades: Trade[] = [];

  constructor(private tradesService: TradeService) { }

  ngOnInit(): void {
    this.tradesService.getAll().subscribe((trades: Trade[]) => {
      // Sort the trades in descending order based on likedBy.length
      trades.sort((a, b) => b.likedBy.length - a.likedBy.length);
      // Get the top three trades
      this.topThreeTrades = trades.slice(0, 3);
    });
  }
}
