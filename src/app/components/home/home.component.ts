import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/interfaces/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: UserModel = new UserModel("");

  constructor(private usersService: UsersService, private ref: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.usersService.getCurrentUser().subscribe((data) => {
      if(data == null){
        this.router.navigate(["/profile-edit"]);
      } else {
        this.user = data;
      }
      this.ref.detectChanges();
    });
  }
}
