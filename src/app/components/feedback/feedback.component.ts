import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { FeedbackModel } from 'src/app/interfaces/Feedback';
import { User } from 'src/app/interfaces/User';
import { FeedbacksService } from 'src/app/services/feedbacks.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  text: string;
  banner:boolean;
  constructor(
    private usersService: UsersService,
    private feedbacksService: FeedbacksService,
    private datePipe: DatePipe,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log("In Feedback")
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
      ).subscribe(x=>{
        this.banner=true;
        this.text='';
        this.ref.detectChanges();
      }
      );
      this.ref.detectChanges();

    }
  }
}
