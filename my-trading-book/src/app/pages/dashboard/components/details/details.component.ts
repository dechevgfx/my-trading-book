import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Trade } from 'src/app/models/trade';
import { TradeService } from 'src/app/services';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  selectedTrade: Trade | undefined;

  constructor(private route: ActivatedRoute, private tradeService: TradeService) { }

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
}
