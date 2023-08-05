import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthPageComponent } from './containers';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services';
import { LoginFormComponent, SignFormComponent } from './components';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TopThreeTradesComponent } from './components/top-three-trades/top-three-trades.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AuthPageComponent,
    LoginFormComponent,
    SignFormComponent,
    ForgotPasswordComponent,
    TopThreeTradesComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
  ]
})
export class AuthModule {
}
