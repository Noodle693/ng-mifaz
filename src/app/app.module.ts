import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';

import { ApiService } from './services/api.service';
import { DrawerService } from './services/drawer.service';

import { AppComponent } from './app.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { CancellationConfirmationDialog } from './components/rides/ride-detail/cancellation-confirmation-dialog';
import { DeleteConfirmationDialog } from './components/settings/delete-confirmation-dialog';
import { DrawerContentComponent } from './components/drawer-content/drawer-content.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderLoginComponent } from './components/header-login/header-login.component';
import { LoginComponent } from './components/user-pages/login/login.component';
import { ModeSelectionComponent } from './components/mode-selection/mode-selection.component';
import { RegisterComponent } from './components/user-pages/register/register.component';
import { ResetPasswordComponent } from './components/user-pages/reset-password/reset-password.component';
import { RideCreationComponent } from './components/rides/ride-creation/ride-creation.component';
import { RideDetailComponent } from './components/rides/ride-detail/ride-detail.component';
import { RideItemComponent } from './components/rides/ride-item/ride-item.component';
import { RideOverviewComponent } from './components/rides/ride-overview/ride-overview.component';
import { SearchComponent } from './components/rides/search/search.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UpdateMailComponent } from './components/settings/setting/update-mail/update-mail.component';
import { UpdateNameComponent } from './components/settings/setting/update-name/update-name.component';
import { UpdatePasswordComponent } from './components/settings/setting/update-password/update-password.component';
import { UpdatePhoneComponent } from './components/settings/setting/update-phone/update-phone.component';
import { UserRidesComponent } from './components/rides/user-rides/user-rides.component';

@NgModule({
  declarations: [
    AppComponent,
    AvatarComponent,
    CancellationConfirmationDialog,
    DeleteConfirmationDialog,
    DrawerContentComponent,
    HeaderComponent,
    HeaderLoginComponent,
    LoginComponent,
    ModeSelectionComponent,
    RegisterComponent,
    ResetPasswordComponent,
    RideCreationComponent,
    RideDetailComponent,
    RideItemComponent,
    RideOverviewComponent,
    SearchComponent,
    SettingsComponent,
    UpdateMailComponent,
    UpdateNameComponent,
    UpdatePasswordComponent,
    UpdatePhoneComponent,
    UserRidesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, AngularMaterialModule, ReactiveFormsModule, HttpClientModule],
  providers: [DrawerService, ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
