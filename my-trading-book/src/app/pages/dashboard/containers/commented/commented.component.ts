import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { TradeService } from "src/app/services/trade.service";
import { Trade } from "src/app/models/trade";
import { Router } from '@angular/router';

@Component({
    selector: 'app-commented',
    templateUrl: './commented.component.html',
    styleUrls: ['./commented.component.scss']
})
export class CommentedComponent implements OnInit {
    commentedTrades: (Trade)[] = []

    currentUserId: string = '';

    constructor(
        public dialog: MatDialog,
        private commentedTradesService: TradeService,
        private router: Router
    ) { }

    ngOnInit() {
        // Retrieve the user ID from local storage
        this.currentUserId = localStorage.getItem('uid') || '';
        this.fetchCommentedBy();

    }

    fetchCommentedBy() {
        this.commentedTradesService.getTradesCommentedByCurrentUser().subscribe((commentedTrades) => {
            console.log('Received Commented Trades:', commentedTrades);
            this.commentedTrades = commentedTrades;
        });
    }
}
