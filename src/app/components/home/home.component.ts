import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any = null;

  constructor(private usersService: UsersService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.usersService.getCurrentUser().subscribe((data) => {
      this.user = data;
      this.ref.detectChanges();
    })
  }
}
