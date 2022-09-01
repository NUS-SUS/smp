import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { Payment } from 'src/app/interfaces/Payment';
import { UserModel } from 'src/app/interfaces/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  email: any;
  user: UserModel;
  campaign: Payment;

  constructor(public router: Router, private ngZone: NgZone, private usersService: UsersService) { }

  ngOnInit() {
    this.ngZone.run(() => {
      Auth.currentAuthenticatedUser().then((user) => {
        this.email = user.attributes.email;
        this.usersService.getUser(this.email).subscribe(data => {
          if (data != null) {
            this.user = data;
          } else {
            this.usersService.getNewUserFromUserPool().subscribe(data => {
              this.router.navigate(['/profile-edit']);
            }), (error => {
              this.router.navigate(['/profile-edit']);
            })
          }
        })
      });
    })
  }

}
