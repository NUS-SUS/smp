import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CampaignsService } from 'src/app/services/campaigns.service';


@Component({
  selector: 'app-view-campaign',
  templateUrl: './view-campaign.component.html',
  styleUrls: ['./view-campaign.component.css']
})
export class ViewCampaignComponent implements OnInit {
  campaign: any;
  applied: boolean = false;
  email: string = "";
  constructor(private campaignsService: CampaignsService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.email = "halimin@email.com"
    this.campaign = JSON.parse(localStorage.getItem('campaign'));
  }
  
  checkEmail() {
    if(this.campaign.APPLIED.indexOf(this.email) > -1) {
      this.applied = true;
      this.ref.detectChanges();
    }
  this.ref.detectChanges();
  }

  applyCampaign() {
    this.campaign.APPLIED.push(this.email);
    let campaign = {
      CAMPAIGNS_ID: this.campaign.CAMPAIGNS_ID,
      CAMPAIGN_NAME: this.campaign.CAMPAIGN_NAME,
      DESCRIPTION: this.campaign.DESCRIPTION,
      TAGS: this.campaign.TAGS,
      CATEGORY: this.campaign.CATEGORY,
      VENUE: this.campaign.VENUE,
      COMPANIES_ID: this.campaign.COMPANIES_ID,
      START_DATE: this.campaign.START_DATE,
      END_DATE: this.campaign.END_DATE,
      STATUS: this.campaign.STATUS,
      APPLIED: this.campaign.APPLIED
    }
    this.campaignsService.updateCampaign(campaign).subscribe(data => {
      this.applied = true;
    });
    this.ref.detectChanges();
  }

}
