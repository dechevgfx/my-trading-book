import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AllTradesComponent, DashboardPageComponent } from './containers';
import { SettingsMenuComponent, TradeFormComponent, UserTradesComponent, } from './components';
import { SharedModule } from '../../shared/shared.module';
import { MatFormFieldModule } from "@angular/material/form-field";
import { DetailsComponent } from './components/details/details.component';
import { TradeComponent } from './components/trade/trade.component';
import { LikedComponent } from './containers/liked/liked.component';
import { LikedTradesComponent } from './components/liked/liked-trades.component';
import { RouterModule } from '@angular/router';
import { ExternalLinkDirective } from './components/details/external-link.directive';





@NgModule({
  declarations: [
    DashboardPageComponent,
    TradeFormComponent,
    UserTradesComponent,
    SettingsMenuComponent,
    AllTradesComponent,
    DetailsComponent,
    TradeComponent,
    LikedComponent,
    LikedTradesComponent,
    ExternalLinkDirective,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatGridListModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    RouterModule,
  ],
  exports: [],
  providers: [
  ]
})
export class DashboardModule {
}
