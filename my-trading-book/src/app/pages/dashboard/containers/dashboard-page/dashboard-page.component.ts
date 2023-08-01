import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TradeFormComponent } from "src/app/pages/dashboard/components";
import { TradeService } from "src/app/services/trade.service";
import {Trade} from "src/app/models/trade";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  userTrades!: (Trade & { id: string; })[]

  constructor(
    public dialog: MatDialog,
    private userTradeService: TradeService,
    private router: Router
  ) {}

ngOnInit() {
  this.fetchTasksCreatedByCurrentUser();
}

fetchTasksCreatedByCurrentUser() {
  this.userTradeService.getTasksCreatedByCurrentUser().subscribe((userTrades) => {
    this.userTrades = userTrades;
  });
}

}
