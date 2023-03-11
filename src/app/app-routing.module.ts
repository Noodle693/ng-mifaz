import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeSelectionComponent } from './components/mode-selection/mode-selection.component';
import { RideCreationComponent } from './components/rides/ride-creation/ride-creation.component';
import { RideDetailComponent } from './components/rides/ride-detail/ride-detail.component';
import { RideOverviewComponent } from './components/rides/ride-overview/ride-overview.component';
import { SearchComponent } from './components/rides/search/search.component';
import { UserRidesComponent } from './components/rides/user-rides/user-rides.component';
import { UpdateMailComponent } from './components/settings/setting/update-mail/update-mail.component';
import { UpdateNameComponent } from './components/settings/setting/update-name/update-name.component';
import { UpdatePasswordComponent } from './components/settings/setting/update-password/update-password.component';
import { UpdatePhoneComponent } from './components/settings/setting/update-phone/update-phone.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/user-pages/login/login.component';
import { RegisterComponent } from './components/user-pages/register/register.component';
import { ResetPasswordComponent } from './components/user-pages/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'mode-selection', component: ModeSelectionComponent },
  { path: 'user-rides', component: UserRidesComponent },
  { path: 'ride-creation', component: RideCreationComponent },
  { path: 'ride-detail', component: RideDetailComponent },
  { path: 'ride-overview', component: RideOverviewComponent },
  { path: 'search', component: SearchComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'settings/update-name', component: UpdateNameComponent },
  { path: 'settings/update-phone', component: UpdatePhoneComponent },
  { path: 'settings/update-mail', component: UpdateMailComponent },
  { path: 'settings/update-password', component: UpdatePasswordComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
