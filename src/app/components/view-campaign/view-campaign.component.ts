import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/interfaces/Campaign';
import { User } from 'src/app/interfaces/User';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { UsersService } from 'src/app/services/users.service';

 
@Component({
  selector: 'app-view-campaign',
  templateUrl: './view-campaign.component.html',
  styleUrls: ['./view-campaign.component.css']
})
export class ViewCampaignComponent implements OnInit {
  campaign: Campaign;
  applied: boolean = false;
  user: User;
  constructor(private router: Router, private usersService: UsersService, private campaignsService: CampaignsService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.usersService.getCurrentUser().subscribe((data) => {
      if(data == null){
        this.router.navigate(["/profile-edit"]);
      } else {
        this.user = data;
        this.campaign = JSON.parse(localStorage.getItem('campaign'));
        console.log(this.campaign);
        this.checkEmail();
      }
      this.ref.detectChanges();
    });
  }
  
  checkEmail() {
    if(this.campaign.APPLIED.indexOf(this.user.EMAIL) > -1) {
      this.applied = true;
      this.ref.detectChanges();
    }
  }

  applyCampaign() {
    this.campaign.APPLIED.push(this.user.EMAIL);
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
