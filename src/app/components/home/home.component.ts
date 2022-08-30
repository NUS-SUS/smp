import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any = null;
  constructor() { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  async getUserInfo() {
    this.user = await Auth.currentAuthenticatedUser();
  }

}
