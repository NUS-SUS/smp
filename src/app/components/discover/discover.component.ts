import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Campaign } from 'src/app/interfaces/Campaign';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  selectedCampaign: any;
  campaigns: any[] = null;
  result: Campaign[] = [];
  query : string = "";
  category: string = "";
  categoryList: string[] = [];
  constructor(private router : Router, private campaignsService: CampaignsService, private ref: ChangeDetectorRef, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.campaignsService.getCampaigns().subscribe((data: any) => {
      this.campaigns = data.campaigns;
      this.getCategoryList();
      this.search();
    })
  }

  async getCategoryList() {
    await this.campaigns.forEach((campaign: Campaign) => {
      if((!this.categoryList.includes(campaign.CATEGORY)) && campaign.STATUS === true){
        this.categoryList.push(campaign.CATEGORY);
      }
    })
  }

  async search() {
    this.result = [];
    await this.campaigns.forEach((campaign: Campaign) => {
      if(campaign.STATUS === true) {
        if(this.category !== "" && this.category === campaign.CATEGORY && this.query !== "" && campaign.CAMPAIGN_NAME.toUpperCase().includes(this.query.toUpperCase())) {
          this.result.push(campaign);
        }
        else if(this.category !== "" && this.category === campaign.CATEGORY && this.query === "") {
          this.result.push(campaign);
        }
        else if(this.category === "" && this.query === "") {
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
