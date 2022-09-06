import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/interfaces/Campaign';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { ClassificationsService } from 'src/app/services/classifications.service';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.css']
})
export class EditCampaignComponent implements OnInit {
  campaign: Campaign = null;
  categories: any[] = [];
  tags: any[] = [];
  constructor(private campaignsService: CampaignsService, private router: Router, private classificationService: ClassificationsService) { }

  ngOnInit(): void {
    this.campaign = JSON.parse(localStorage.getItem('campaign'));
  }

  updateCampaign() {
    this.campaignsService.updateCampaign(this.campaign)
      .subscribe(() => {
        this.router.navigate(['/campaign']);
      })
  }

  navigateToCreate() {
    this.router.navigateByUrl('/create-campaign');
 }

  navigateToCampaignDel() {
      this.campaign.STATUS = false;
      this.updateCampaign();
  }


  // async getCategory() {
  //   if (this.categories.length > 0) {
  //     this.categories = [];
  //   }
  //   await this.classifications.classifications.forEach((element) => {
  //     if (element.TYPES === 'CATEGORY') {
  //       this.categories.push(element);
  //     }
  //   });
  //   this.ref.detectChanges();
  // }

   async getTags() {
  //   if (this.tags.length > 0) {
  //     if (this.campaign.CATEGORY !== this.tags[0].PARENT) {
  //       this.campaign.TAGS = [];
  //     }
  //     this.tags = [];
  //   }
  //   await this.classifications.classifications.forEach((element) => {
  //     if (element.TYPES === 'TAG' && element.PARENT === this.campaign.CATEGORY) {
  //       this.tags.push(element);
  //     }
  //   });
  //   this.ref.detectChanges();
   }

}
