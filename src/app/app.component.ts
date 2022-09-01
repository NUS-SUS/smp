import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components'
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smp';
  isCompany: boolean;
  authState!: AuthState;
  user: CognitoUserInterface | undefined;
  displayName: string;
  isInfluencer: boolean;
  
  constructor(private zone: NgZone, private ref: ChangeDetectorRef, private usersService: UsersService) { }

  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.usersService.getCurrentUser().subscribe((data: any) => {
        if (data.USER_TYPE === "Company") {
          this.isCompany = true;
          this.displayName = data.COMPANY_NAME;
        } else {
          this.isCompany = false;
        }
        if(data.USER_TYPE === "Influencer"){
          this.isInfluencer = true;
          this.displayName = data.FULL_NAME;
        } else{
          this.isInfluencer = false;
        }
        this.ref.detectChanges();
      })
      this.ref.detectChanges();
    })
  }
}
