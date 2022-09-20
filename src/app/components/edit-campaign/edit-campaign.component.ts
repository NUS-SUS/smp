import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
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
  classifications: any = { classifications: [] };
  constructor(private ngZone: NgZone, private campaignsService: CampaignsService, private router: Router, private classificationsService: ClassificationsService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCategory();
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

  getCategory() {
    this.classificationsService.getCategories().subscribe((data: any) => {
     let categories = data.classifications;
     for(let category of categories){
       if (category.TYPES == 'CATEGORY'){
         this.categories.push(category);
       }
     }
     this.ref.detectChanges();
    })
    console.log(this.categories);
   }
 
   getTags() {
     let parentId: any;
     for(let category of this.categories) {
       if(this.campaign.CATEGORY === category.VALUE){
         parentId = category.CLASSIFICATIONS_ID;
       }
     }
     this.classificationsService.getTags(parentId).subscribe((data: any) => {
       this.tags = data.classifications;
       this.campaign.TAGS = [];
     });
     this.ref.detectChanges();
   }

}
