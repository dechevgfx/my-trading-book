import { Component } from '@angular/core';
import { routes } from 'src/app/consts';
import { MatDialog } from "@angular/material/dialog";
import { StorageService, TradeService } from 'src/app/services';
import { AuthService } from 'src/app/pages/auth/services';
import { UserService } from "src/app/services/user.service";
import { Observable } from 'rxjs';
import { User } from 'src/app/models';
import { TradeFormComponent } from 'src/app/pages/dashboard/components';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public routes: typeof routes = routes;
  public user$!: Observable<User | undefined>
  constructor(public dialog: MatDialog, private tasksService: TradeService, private authService: AuthService,
    private userService: UserService, private storageService: StorageService) {
    this.user$ = this.userService.userData()


  }

  createTask() {
    const dialogRef = this.dialog.open(TradeFormComponent);
    dialogRef.afterClosed().subscribe();
  }
  public signOut(): void {
    this.authService.logout();
  }


}
