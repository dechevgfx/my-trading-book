import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/services';
import { UserService } from "src/app/services/user.service";
import firebase from "firebase/compat/app";
import { User } from "src/app/models";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isMenuOpened!: boolean;
  @Output() isShowSidebar = new EventEmitter<boolean>();
  public user$!: Observable<User | undefined>

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.user$ = this.userService.userData()
  }

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    this.isShowSidebar.emit(this.isMenuOpened);
  }

  public signOut(): void {
    this.authService.logout();
  }
}
