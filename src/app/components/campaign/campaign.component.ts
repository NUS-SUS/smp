import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/interfaces/Campaign';
import { UserModel } from 'src/app/interfaces/User';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {
  campaigns: Campaign[] = [];
  user: UserModel = {};
  constructor(private ref: ChangeDetectorRef, private usersService: UsersService, private router:Router, private campaignsService: CampaignsService) {
  }

  ngOnInit(): void {
    this.usersService.getCurrentUser().subscribe((data) => {
      if(data == null){
        this.router.navigate(["/profile-edit"]);
      } else {
        this.user = data;
      }
      this.ref.detectChanges();
    });
    this.campaignsService.getCampaigns().subscribe((data: any) => {
      this.campaigns = data.campaigns;
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
