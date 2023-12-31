import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from "@angular/fire/compat/auth-guard";
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AllTradesComponent, DashboardPageComponent } from './pages/dashboard/containers';
import { DetailsComponent } from './pages/dashboard/components/details/details.component';
import { LiveChartComponent } from './shared/live-chart/live-chart.component';
import { LikedComponent } from './pages/dashboard/containers/liked/liked.component';
import { CommentedComponent } from './pages/dashboard/containers/commented/commented.component';

const redirectLoggedInToItems = () => redirectLoggedInTo(['dashboard']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'live-chart',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: LiveChartComponent
  },
  {
    path: 'all-trades',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: AllTradesComponent
  },
  {
    path: 'all-trades/:id',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: DetailsComponent
  },
  {
    path: 'liked',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: LikedComponent
  },
  {
    path: 'commented',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: CommentedComponent
  },
  {
    path: 'dashboard',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    component: DashboardPageComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToItems }
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login' // Redirect to /login by default when the path is empty
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
