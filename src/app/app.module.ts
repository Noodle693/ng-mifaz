import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user-pages/login/login.component';
import { RegisterComponent } from './components/user-pages/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderLoginComponent } from './components/header-login/header-login.component';
import { ResetPasswordComponent } from './components/user-pages/reset-password/reset-password.component';
import { ModeSelectionComponent } from './components/mode-selection/mode-selection.component';
import { RideCreationComponent } from './components/rides/ride-creation/ride-creation.component';
import { DrawerService } from './services/drawer.service';
import { UserRidesComponent } from './components/rides/user-rides/user-rides.component';
import { RideItemComponent } from './components/rides/ride-item/ride-item.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { RideDetailComponent } from './components/rides/ride-detail/ride-detail.component';
import { DrawerContentComponent } from './components/drawer-content/drawer-content.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RideOverviewComponent } from './components/rides/ride-overview/ride-overview.component';
import { SearchComponent } from './components/rides/search/search.component';
import { UpdateNameComponent } from './components/settings/setting/update-name/update-name.component';
import { UpdatePhoneComponent } from './components/settings/setting/update-phone/update-phone.component';
import { UpdateMailComponent } from './components/settings/setting/update-mail/update-mail.component';
import { UpdatePasswordComponent } from './components/settings/setting/update-password/update-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HeaderLoginComponent,
    ResetPasswordComponent,
    ModeSelectionComponent,
    RideCreationComponent,
    UserRidesComponent,
    RideItemComponent,
    AvatarComponent,
    RideDetailComponent,
    DrawerContentComponent,
    SettingsComponent,
    RideOverviewComponent,
    SearchComponent,
    UpdateNameComponent,
    UpdatePhoneComponent,
    UpdateMailComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DrawerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
