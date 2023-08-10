import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TradeService } from "src/app/services/trade.service";
import { Trade } from "src/app/models/trade";
import { Router } from '@angular/router';

@Component({
    selector: 'app-liked',
    templateUrl: './liked.component.html',
    styleUrls: ['./liked.component.scss']
})
export class LikedComponent implements OnInit {
    likedTrades!: (Trade & { id: string; })[]

    currentUserId: string = '';

    constructor(
        public dialog: MatDialog,
        private likedTradeService: TradeService,
        private router: Router
    ) { }

    ngOnInit() {
        // Retrieve the user ID from local storage
        this.currentUserId = localStorage.getItem('uid') || '';
        this.fetchLikedBy();

    }

    fetchLikedBy() {
        this.likedTradeService.getTradesLikedByCurrentUser().subscribe((likedTrades) => {
            this.likedTrades = likedTrades;
        });
    }
}
