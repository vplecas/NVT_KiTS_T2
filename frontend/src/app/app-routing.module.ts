import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapsComponent } from './components/maps/maps.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { HomePageComponent } from './layouts/home-page/home-page.component';
import { RegisterComponent } from './components/register/register.component';
import { VerificationPageComponent } from './components/verification-page/verification-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RoleGuard } from './guards/role.guard';
import { CHTypesComponent } from './components/ch-types/ch-types.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        canActivate: [RoleGuard],
        data: {expectedRoles: 'ROLE_ADMIN|ROLE_USER'}
      },
      {
        path: 'types',
        component: CHTypesComponent,
        canActivate: [RoleGuard],
        data: {expectedRoles: 'ROLE_ADMIN'}
      },
      {
        path: 'me/:index',
        component: MyProfileComponent
      },
      {
        path: 'maps',
        component: MapsComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'verify/:id',
        component: VerificationPageComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
