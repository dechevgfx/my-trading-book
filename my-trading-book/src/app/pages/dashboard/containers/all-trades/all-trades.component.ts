import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import { TradeService } from "src/app/services/trade.service";
import { Trade } from "src/app/models/trade";
import { DetailsComponent } from '../../components/details/details.component';

@Component({
  selector: 'app-all-trades',
  templateUrl: './all-trades.component.html',
  styleUrls: ['./all-trades.component.scss']
})
export class AllTradesComponent implements OnInit {
  trades!: (Trade & { id: string; })[]

  constructor(public dialog: MatDialog, private tradeService: TradeService) {
  }

  ngOnInit() {
    this.tradeService.getAllSorted().subscribe((trades) => {
      this.trades = trades
    })
  }

}
