import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Trade } from 'src/app/models';
import { TradeService } from 'src/app/services';
import { TradeFormComponent } from '../trades-form/trades-form.component';
@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent {
  @Input() data!: Trade

  constructor(private dialog: MatDialog, private userTradeService: TradeService) {
  }


  editTask() {
    const dialogRef = this.dialog.open(TradeFormComponent, {data: this.data})
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteTask() {
    this.userTradeService.delete(this.data)
  }


}
