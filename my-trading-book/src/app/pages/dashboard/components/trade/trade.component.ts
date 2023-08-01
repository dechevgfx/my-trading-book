import { Component, Input } from '@angular/core';
import { Trade } from "src/app/models/trade";
import { DetailsComponent } from '../details/details.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.scss']
})
export class TradeComponent {
  @Input() tradeData!: Trade[];

  constructor(private router: Router) { }
  transformStatus(status: string): string {
    return status.replace('_', ' ')
  }

  goToTradeDetails(trade: any): void {
    this.router.navigate(['/all-trades', trade.id]);
  }

}
