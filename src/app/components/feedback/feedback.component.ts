import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FeedbacksService } from '../../services/feedbacks.service';
import { User, UserModel } from '../../interfaces/User';
import { FeedbackModel } from 'src/app/interfaces/Feedback';
import { DatePipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  providers: [DatePipe]
})
export class FeedbackComponent implements OnInit{
  text: string;
  banner:boolean;
  user: UserModel = {};
  constructor(
    private usersService: UsersService,
    private feedbacksService: FeedbacksService,
    private datePipe: DatePipe,
    private ref: ChangeDetectorRef,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.usersService.getCurrentUser().subscribe((data) => {
      if(data == null){
        this.router.navigate(["/profile-edit"]);
      } else {
        this.user = data;
      }
      this.ref.detectChanges();
    });
  }

  onSubmit() {
    if (!this.text) {
      alert("Please enter your message before submitting");
    } else {
      this.usersService.getCurrentUser().pipe(switchMap((user: User) => {
        const generateId = Date.now().toString();
        let fb = new FeedbackModel(generateId);
        fb.MESSAGE = this.text;
        fb.SUBMITTED_DATE = parseInt(this.datePipe.transform(generateId, 'ddMMyyyy'));
        if (user.USER_TYPE === "Influencer") {
          fb.INFLUENCERS_ID = user.EMAIL;
        } else if (user.USER_TYPE === "Company") {
          fb.COMPANIES_ID = user.EMAIL;
        }
        return this.feedbacksService.addFeedback(fb);
      })
      ).subscribe(()=>{
        this.banner=true;
        this.text='';
        this.ref.detectChanges();
      }
      );
      this.ref.detectChanges();

    }
  }
}
