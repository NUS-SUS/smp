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
  categories: any[] = [{}];
  tags: any[] = [{}];
  classifications: any = { classifications: [] };
  constructor(private ngZone: NgZone, private campaignsService: CampaignsService, private router: Router, private classificationsService: ClassificationsService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getClassifications();
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

  getClassifications() {
    this.ngZone.run(() => {
      this.classificationsService.getCategories().subscribe((data: any) => {
        this.classifications = data;
        this.getCategory();
        this.ref.detectChanges();
      });
    });
  }

  getCategory() {
    this.ngZone.run(() => {
      if (this.categories.length > 0) {
        this.categories = [];
      }
      this.classifications.classifications.forEach((element) => {
        if (element.TYPES === 'CATEGORY') {
          this.categories.push(element);
        }
      });
      this.ref.detectChanges();
    });
  }

  getTags() {
    var parentId : any = '';
    this.classifications.classifications.forEach((element) => {
      if (element.VALUE === this.campaign.CATEGORY) {
        parentId = element.CLASSIFICATIONS_ID;
        this.classificationsService.getTags(parentId).subscribe((data: any) => {
          this.tags = data.classifications;
        });
        this.ref.detectChanges();
      }
    });
  }

}
