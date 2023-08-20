import { Component, Input } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Trade, User } from 'src/app/models';
import { StorageService, TradeService, UserService } from 'src/app/services';
import { TradeFormComponent } from '../trades-form/trades-form.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings-menu',
  templateUrl: './settings-menu.component.html',
  styleUrls: ['./settings-menu.component.scss']
})
export class SettingsMenuComponent {
  @Input() data!: Trade
  private userUid: string | null = null; // Store the user UID here

  constructor(private dialog: MatDialog, private userTradeService: TradeService, private router: Router, private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userUid = user.uid;
      } else {
        this.userUid = null;
      }
    });
  }


  isCommentedByUser() {
    const pathname = window.location.pathname;

    const pathComponents = pathname.split('/');
    const lastPathComponent = pathComponents[pathComponents.length - 1];

    const tradeId = lastPathComponent;

    if (this.data !== undefined) {
      for (const comment of this.data.comments || []) {
        if (comment.userId === this.userUid) {
          return true; // Exit and return true once a matching comment is found
        }
      }
    }
    return false; // Return false if no matching comment is found
  }


  isLikedByUser() {
    const pathname = window.location.pathname;

    // Split the pathname by slashes and get the last component
    const pathComponents = pathname.split('/');
    const lastPathComponent = pathComponents[pathComponents.length - 1];

    if (this.data !== undefined) {
      if (this.data.likedBy.includes(this.userUid ?? '') && lastPathComponent == "liked") {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  isOwner() {
    const pathname = window.location.pathname;

    // Split the pathname by slashes and get the last component
    const pathComponents = pathname.split('/');
    const lastPathComponent = pathComponents[pathComponents.length - 1];

    if (this.userUid == this.data.userId && lastPathComponent == "dashboard") {
      return true
    } else {
      return false
    }
  }

  editTrade() {
    const dialogRef = this.dialog.open(TradeFormComponent, { data: this.data })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteTrade() {
    this.userTradeService.delete(this.data)
  }

  disLike() {
    this.userTradeService.disLike(this.data)
  }

  viewDetails() {
    this.router.navigate(['/all-trades', this.data.id])
  }

}
