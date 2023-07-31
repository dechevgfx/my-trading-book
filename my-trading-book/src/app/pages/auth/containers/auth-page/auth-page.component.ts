import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;

  constructor(
    private authService: AuthService,
  ) {
  }

  public sendLoginForm({ email, password }: { email: string, password: string }): void {
    this.authService.login(email, password);

  }

  public loginWithGoogle(): void {
    this.authService.loginGoogle()
  }

  public resetPass({ email }: { email: string }): void {
    this.authService.resetPassword(email)
  }

  public sendSignForm({ email, password }: { email: string, password: string }): void {
    this.authService.signIn(email, password);
  }
  showForgotPassword() {
    this.tabGroup.selectedIndex = 2; // Index of the "Forgot Password" tab in the tab group
  }

}
