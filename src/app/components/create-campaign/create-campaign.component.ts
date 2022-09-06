import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/interfaces/Campaign';
import { Classification } from 'src/app/interfaces/Classification';
import { UserModel } from 'src/app/interfaces/User';
import { CampaignsService } from 'src/app/services/campaigns.service';
import { ClassificationsService } from 'src/app/services/classifications.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {
  title = 'Create Campaign';
  campaigns: Campaign[];
  campaign = new Campaign();
  classifications: any = { classifications: [] };
  tags: any[] = [{}];
  categories: any[] = [{}];
  user: UserModel = {};
  constructor(private campaignService: CampaignsService, public router: Router, private ref: ChangeDetectorRef, private ngZone: NgZone, 
    private classificationsService: ClassificationsService,private userService: UsersService) { }

  ngOnInit(): void {
    this.getClassifications();
    this.refreshCampaigns();
    this.getUsers();
    this.campaign.CAMPAIGNS_ID = '';
    this.campaign.CAMPAIGN_NAME = '';
    this.campaign.CATEGORY = '';
    this.campaign.TAGS = [];
    this.campaign.COMPANIES_ID = '';
    this.campaign.DESCRIPTION = '';
    this.campaign.START_DATE = null;
    this.campaign.END_DATE = null;
    this.campaign.VENUE = '';
    this.campaign.STATUS = true;
  }

  refreshCampaigns() {
    this.campaignService.getCampaigns()
      .subscribe(data => {
        this.campaigns = data;
      })

  }

  getUsers() {
    this.userService.getCurrentUser().subscribe(data => {
      this.user = data
      this.ref.detectChanges();
  })
  }

  navigateToFunds(){
    this.router.navigateByUrl('/checkout');}

  minusFunds(){
    this.user.CAMPAIGN_FUNDS = this.user.CAMPAIGN_FUNDS - 5;
    this.userService.updateUser(this.user).subscribe(data =>{
      this.user = data
      this.ref.detectChanges();
    })
  }
  
  addCampaign() {
    const generateId = Date.now().toString();
    this.campaign.CAMPAIGNS_ID = generateId;
    this.campaign.COMPANIES_ID = this.user.COMPANY_NAME;
    this.minusFunds();
    this.campaignService.addCampaign(this.campaign)
      .subscribe(data => {
        this.refreshCampaigns();
        this.router.navigate(['/campaign']);
      })
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
