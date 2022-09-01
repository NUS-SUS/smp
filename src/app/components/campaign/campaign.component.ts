import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/interfaces/Campaign';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  campaigns: any[] = [];
  user: any = {
    USER_TYPE: "Company",
    COMPANY_NAME: "000001"
  }
  constructor(private userService: UsersService, private router:Router, private campaignsService: CampaignsService) {
    console.log();
  }

  ngOnInit(): void {
    this.campaignsService.getCampaigns().subscribe((data: any) => {
      this.campaigns = data.campaigns;
      console.log(this.campaigns);
    });
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data
    });
  }

  navigateToEdit(campaign: Campaign) {
      this.campaignsService.setCurrentCampaign(campaign);
      this.router.navigateByUrl('/edit-campaign');
   }

   navigateToCreate() {
      this.router.navigateByUrl('/create-campaign');
   }

}
