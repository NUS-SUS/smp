import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  campaign: Campaign = new Campaign();
  tags: Classification[] = [];
  categories: Classification[] = [];
  user: UserModel = {};
  constructor( private usersService: UsersService, private campaignService: CampaignsService, public router: Router, private ref: ChangeDetectorRef, 
    private classificationsService: ClassificationsService,private userService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getCurrentUser().subscribe((data) => {
      if(data == null){
        this.router.navigate(["/profile-edit"]);
      } else {
        this.user = data;
      }
      this.ref.detectChanges();
    });
    this.getCategory();
    this.getUsers();
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
    this.campaign.STATUS = true;
    this.campaign.APPLIED = [];
    this.campaignService.addCampaign(this.campaign)
      .subscribe(() => {
        this.minusFunds();
        this.router.navigate(['/campaign']);
      })
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
