import { Component, Input } from '@angular/core';
import { Trade } from "src/app/models/trade";

@Component({
  selector: 'app-user-trades',
  templateUrl: './user-trades.component.html',
  styleUrls: ['./user-trades.component.scss']
})
export class UserTradesComponent {
  @Input() userTradesData!: Trade[];
  public displayedColumns: string[] = ['pair', 'type', 'date', 'actions'];

  transformStatus(status: string): string {
    return status.replace('_', ' ')
  }
}
