import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { PaymentComponent } from './components/payment/payment.component';
import { CampaignEditComponent } from './components/campaign-edit/campaign-edit.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import { RedirectionComponent } from './components/redirection/redirection.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { NgxStripeModule } from 'ngx-stripe';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutSuccessComponent } from './components/checkout-success/checkout-success.component';
import { CheckoutCancelComponent } from './components/checkout-cancel/checkout-cancel.component';
import { CheckoutCompleteComponent } from './components/checkout-complete/checkout-complete.component';
import { FeedbackComponent } from './components/feedback/feedback.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component'
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxNavigationWithDataComponent } from "ngx-navigation-with-data";
import { ViewCampaignComponent } from './components/view-campaign/view-campaign.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    HomeComponent,
    CampaignComponent,
    ProfileComponent,
    DiscoverComponent,
    PaymentComponent,
    CampaignEditComponent,
    ProfileEditComponent,
    RedirectionComponent,
    CheckoutComponent,
    CheckoutSuccessComponent,
    CheckoutCancelComponent,
    CheckoutCompleteComponent,
    CreateCampaignComponent,
    FeedbackComponent,
    ViewCampaignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxBootstrapIconsModule.pick(allIcons),
    ReactiveFormsModule,
    AmplifyUIAngularModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    NgxStripeModule.forRoot('pk_test_51HIVqvIs1V0ZAkpP7Rben7HaMW5WZuZ5dAG8svGu3YbI3yE1AAkoD9VAjYRvVtfVoatUe7c8X01UTBy7CvkifR1F00hAhIPl9G'),
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    NgSelectModule,
    BrowserAnimationsModule,
    AmplifyAuthenticatorModule
  ],
  providers: [NgxNavigationWithDataComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
