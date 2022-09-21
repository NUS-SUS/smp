import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/interfaces/User';
import { countries, languages } from 'countries-list';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';


import { UsersService } from 'src/app/services/users.service';
import { ClassificationsService } from '../../services/classifications.service'

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileEditComponent implements OnInit {

  classifications: any = { classifications: [] };
  categories: any[] = [];
  tags: any[] = [];
  countries: any[] = [];
  languages: any[] = [];
  userType: any[] = [{ id: "I", name: "Influencer" }, { id: "C", name: "Company" }]

  email: string;
  addUser: UserModel;
  editUser: UserModel;
  formModeEdit: boolean;

  profileForm = new FormGroup({
    EMAIL: new FormControl('', [Validators.required, Validators.email]),
    BLOCK_NUMBER: new FormControl('', [Validators.required]),
    CONTACT_NUMBER: new FormControl('', [Validators.required]),
    POSTAL_CODE: new FormControl('', [Validators.required]),
    STREET_NAME: new FormControl('', [Validators.required]),
    UNIT_NUMBER: new FormControl('', [Validators.required]),
    USER_TYPE: new FormControl('', [Validators.required]),
    CAMPAIGN_FUNDS: new FormControl(0),
    COMPANY_NAME: new FormControl(''),
    BIRTHDATE: new FormControl(''),
    CATEGORY: new FormControl(''),
    FULL_NAME: new FormControl(''),
    GENDER: new FormControl(''),
    LANGUAGE: new FormControl([]),
    NATIONALITY: new FormControl(''),
    PROFILE_PHOTO: new FormControl(''),
    SOCIAL_MEDIA: new FormControl([]),
    TAGS: new FormControl([]),
    VERIFIED: new FormControl(false),
  });

  constructor(private ngZone: NgZone, private ref: ChangeDetectorRef, public fb: FormBuilder, public router: Router, private usersService: UsersService, private classificationsService: ClassificationsService) {
  }

  ngOnInit() {
    this.ngZone.run(() => {
      this.prepareNationalityDropdown();
      this.prepareLangaugeDropdown();
      this.getUser();
      this.getCategory();
    })
  }

  prepareNationalityDropdown() {
    this.ngZone.run(() => {
      for (const [key, value] of Object.entries(countries)) {
        this.countries.push({
          id: key,
          name: value.name
        });
      }
    })
  }

  prepareLangaugeDropdown() {
    this.ngZone.run(() => {

      for (const [key, value] of Object.entries(languages)) {
        this.languages.push({
          id: key,
          name: value.name
        });
      }
    })
  }

  getUser() {
    this.ngZone.run(() => {
      Auth.currentAuthenticatedUser().then((user) => {
        this.email = user.attributes.email;
        this.usersService.getUser(this.email).subscribe(data => {
          if (data != null) {
            this.editUser = data;
            this.formModeEdit = true;
            this.setUpdateForm(this.editUser);
            this.ref.detectChanges();
          } else {
            this.usersService.getNewUserFromUserPool().subscribe(data => {
              if (data != null) {
                this.addUser = data;
                this.formModeEdit = false;
                this.setUpdateAdd(this.addUser);
                this.ref.detectChanges();
              }
            })
          }
        })
      });
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
      if(this.profileForm.value.CATEGORY === category.VALUE){
        parentId = category.CLASSIFICATIONS_ID;
      }
    }
    this.classificationsService.getTags(parentId).subscribe((data: any) => {
      this.tags = data.classifications;
      this.profileForm.controls['TAGS'].setValue([]);
    });
    this.ref.detectChanges();
  }

  setUpdateForm(user: UserModel) {
    this.ngZone.run(() => {
      this.profileForm.controls['EMAIL'].setValue(user.EMAIL);
      this.profileForm.controls['USER_TYPE'].setValue(user.USER_TYPE);
      this.profileForm.controls['NATIONALITY'].setValue(user.NATIONALITY);
      this.profileForm.controls['CONTACT_NUMBER'].setValue(user.CONTACT_NUMBER);
      this.profileForm.controls['BLOCK_NUMBER'].setValue(user.BLOCK_NUMBER);
      this.profileForm.controls['STREET_NAME'].setValue(user.STREET_NAME);
      this.profileForm.controls['UNIT_NUMBER'].setValue(user.UNIT_NUMBER);
      this.profileForm.controls['POSTAL_CODE'].setValue(user.POSTAL_CODE);
      this.profileForm.controls['VERIFIED'].setValue(user.VERIFIED);

      this.profileForm.controls['COMPANY_NAME'].setValue(user.COMPANY_NAME);
      this.profileForm.controls['CAMPAIGN_FUNDS'].setValue(user.CAMPAIGN_FUNDS);

      this.profileForm.controls['CATEGORY'].setValue(user.CATEGORY);
      this.profileForm.controls['TAGS'].setValue(user.TAGS);
      this.profileForm.controls['FULL_NAME'].setValue(user.FULL_NAME);
      this.profileForm.controls['BIRTHDATE'].setValue(user.BIRTHDATE);
      this.profileForm.controls['GENDER'].setValue(user.GENDER);
      this.profileForm.controls['LANGUAGE'].setValue(user.LANGUAGE);
      this.profileForm.controls['PROFILE_PHOTO'].setValue(user.PROFILE_PHOTO);
      this.profileForm.controls['SOCIAL_MEDIA'].setValue(user.SOCIAL_MEDIA);

      this.ref.detectChanges();
    })
  }

  setUpdateAdd(user: UserModel) {
    this.ngZone.run(() => {
      this.profileForm.controls['EMAIL'].setValue(user.EMAIL);
      this.profileForm.controls['CAMPAIGN_FUNDS'].setValue(0);
    })
  }

  addForm() {
    this.ngZone.run(() => {
      if (this.profileForm.value.USER_TYPE === "Company") {
        let company = {
          EMAIL: this.profileForm.value.EMAIL,
          USER_TYPE: this.profileForm.value.USER_TYPE,
          COMPANY_NAME: this.profileForm.value.COMPANY_NAME,
          CAMPAIGN_FUNDS: this.profileForm.value.CAMPAIGN_FUNDS,
          NATIONALITY: this.profileForm.value.NATIONALITY,
          CONTACT_NUMBER: this.profileForm.value.CONTACT_NUMBER,
          BLOCK_NUMBER: this.profileForm.value.BLOCK_NUMBER,
          STREET_NAME: this.profileForm.value.STREET_NAME,
          UNIT_NUMBER: this.profileForm.value.UNIT_NUMBER,
          POSTAL_CODE: this.profileForm.value.POSTAL_CODE
        }
        this.usersService.addUser(company).subscribe(() => {
          this.router.navigate(['/profile']);
        });
      }
      else {
        if (this.profileForm.value.USER_TYPE === "Influencer") {
          let influencer = {
            EMAIL: this.profileForm.value.EMAIL,
            USER_TYPE: this.profileForm.value.USER_TYPE,
            BIRTHDATE: this.profileForm.value.BIRTHDATE,
            CATEGORY: this.profileForm.value.CATEGORY,
            TAGS: this.profileForm.value.TAGS,
            NATIONALITY: this.profileForm.value.NATIONALITY,
            LANGUAGE: this.profileForm.value.LANGUAGE,
            SOCIAL_MEDIA: this.profileForm.value.SOCIAL_MEDIA,
            FULL_NAME: this.profileForm.value.FULL_NAME,
            CONTACT_NUMBER: this.profileForm.value.CONTACT_NUMBER,
            BLOCK_NUMBER: this.profileForm.value.BLOCK_NUMBER,
            STREET_NAME: this.profileForm.value.STREET_NAME,
            UNIT_NUMBER: this.profileForm.value.UNIT_NUMBER,
            POSTAL_CODE: this.profileForm.value.POSTAL_CODE
          }
          this.usersService.addUser(influencer).subscribe(() => {
            this.router.navigate(['/profile']);
          });
        }
      }
    })
  }

  editForm() {
    this.ngZone.run(() => {
      if (this.profileForm.value.USER_TYPE === "Company") {
        let company = {
          EMAIL: this.profileForm.value.EMAIL,
          USER_TYPE: this.profileForm.value.USER_TYPE,
          COMPANY_NAME: this.profileForm.value.COMPANY_NAME,
          CAMPAIGN_FUNDS: this.profileForm.value.CAMPAIGN_FUNDS,
          NATIONALITY: this.profileForm.value.NATIONALITY,
          CONTACT_NUMBER: this.profileForm.value.CONTACT_NUMBER,
          BLOCK_NUMBER: this.profileForm.value.BLOCK_NUMBER,
          STREET_NAME: this.profileForm.value.STREET_NAME,
          UNIT_NUMBER: this.profileForm.value.UNIT_NUMBER,
          POSTAL_CODE: this.profileForm.value.POSTAL_CODE
        }
        this.usersService.updateUser(company).subscribe(() => {
          this.router.navigate(['/profile']);
        });
      }
      else {
        if (this.profileForm.value.USER_TYPE === "Influencer") {
          let influencer = {
            EMAIL: this.profileForm.value.EMAIL,
            USER_TYPE: this.profileForm.value.USER_TYPE,
            BIRTHDATE: this.profileForm.value.BIRTHDATE,
            CATEGORY: this.profileForm.value.CATEGORY,
            TAGS: this.profileForm.value.TAGS,
            NATIONALITY: this.profileForm.value.NATIONALITY,
            LANGUAGE: this.profileForm.value.LANGUAGE,
            SOCIAL_MEDIA: this.profileForm.value.SOCIAL_MEDIA,
            FULL_NAME: this.profileForm.value.FULL_NAME,
            CONTACT_NUMBER: this.profileForm.value.CONTACT_NUMBER,
            BLOCK_NUMBER: this.profileForm.value.BLOCK_NUMBER,
            STREET_NAME: this.profileForm.value.STREET_NAME,
            UNIT_NUMBER: this.profileForm.value.UNIT_NUMBER,
            POSTAL_CODE: this.profileForm.value.POSTAL_CODE
          }
          this.usersService.updateUser(influencer).subscribe(() => {
            this.router.navigate(['/profile']);
          });
        }
      }
    })
  }
}
