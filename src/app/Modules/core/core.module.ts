import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ToastrComponent } from './components/toastr/toastr.component';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NewTitlesSectionComponent } from './components/new-titles-section/new-titles-section.component';
import { SharedModule } from '../shared/shared.module';
import { NotificationsBarComponent } from './components/notifications-bar/notifications-bar.component';
import { InfoSectionComponent } from './components/info-section/info-section.component';
import { CoreRoutingModule } from './core.routing.module';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ToastrComponent,
    LandingPageComponent,
    NewTitlesSectionComponent,
    InfoSectionComponent,
    NotificationsBarComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, CoreRoutingModule],
  exports: [
    FooterComponent,
    HeaderComponent,
    ToastrComponent,
    LandingPageComponent,
    NewTitlesSectionComponent,
    InfoSectionComponent,
    NotificationsBarComponent,
  ],
})
export class CoreModule {}
