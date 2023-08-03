import { Component, Input } from '@angular/core';
import { Trade } from "src/app/models/trade";

@Component({
  selector: 'app-liked-trades',
  templateUrl: './liked-trades.component.html',
  styleUrls: ['./liked-trades.component.scss']
})
export class LikedTradesComponent {
  @Input() likedTradesData!: Trade[];
  public displayedColumns: string[] = ['pair', 'type', 'date', 'actions'];

  transformStatus(status: string): string {
    return status.replace('_', ' ')
  }
}
