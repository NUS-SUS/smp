import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Campaign } from 'src/app/interfaces/Campaign';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  selectedCampaign: any;
  campaigns: Campaign[] = null;
  result: Campaign[] = [];
  query : string = "";
  category: string = "";
  categoryList: string[] = [];
  constructor(private router : Router, private campaignsService: CampaignsService, private ref: ChangeDetectorRef, private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getCurrentUser().subscribe((data) => {
      if(data == null){
        this.router.navigate(["/profile-edit"]);
      }
      this.ref.detectChanges();
    });
    this.campaignsService.getCampaigns().subscribe((data: any) => {
      this.campaigns = data.campaigns;
      this.getCategoryList();
      this.search();
    })
  }

  getCategoryList() {
    this.campaigns.forEach((campaign: Campaign) => {
      if((!this.categoryList.includes(campaign.CATEGORY)) && campaign.STATUS === true){
        this.categoryList.push(campaign.CATEGORY);
      }
    })
  }

  search() {
    this.result = [];
    this.campaigns.forEach((campaign: Campaign) => {
      if(campaign.STATUS === true) {
        if((this.category !== "" && this.category === campaign.CATEGORY && this.query !== "" && campaign.CAMPAIGN_NAME.toUpperCase().includes(this.query.toUpperCase())) ||
        (this.category !== "" && this.category === campaign.CATEGORY && this.query === "") ||
        (this.category === "" && this.query === "")) {
          this.result.push(campaign);
        }
      }
    });
    this.ref.detectChanges();
  }

  viewCampaign(campaign: Campaign){
    this.campaignsService.setCurrentCampaign(campaign);
    this.router.navigateByUrl('/view-campaign');
  }

}
