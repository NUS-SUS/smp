import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { HomeComponent } from './components/home/home.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewCampaignComponent } from './components/view-campaign/view-campaign.component';
import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component';
import { EditCampaignComponent } from './components/edit-campaign/edit-campaign.component';


@NgModule({
  declarations: [
    AppComponent,
    DiscoverComponent,
    FeedbackComponent,
    HomeComponent,
    CampaignComponent,
    ProfileComponent,
    ViewCampaignComponent,
    CreateCampaignComponent,
    EditCampaignComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    RouterModule.forRoot([
      {path: 'discover', component: DiscoverComponent},
      {path: 'feedback', component: FeedbackComponent},
      {path: 'home', component: HomeComponent},
      {path: 'campaign', component: CampaignComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'view-campaign', component: ViewCampaignComponent},
      {path: 'create-campaign', component: CreateCampaignComponent},
      {path: 'edit-campaign', component: EditCampaignComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
