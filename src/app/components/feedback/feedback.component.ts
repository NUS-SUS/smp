import { Component,ChangeDetectorRef } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FeedbacksService } from '../../services/feedbacks.service';
import { User } from '../../interfaces/User';
import { FeedbackModel } from 'src/app/interfaces/Feedback';
import { DatePipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css'],
  providers: [DatePipe]
})
export class FeedbackComponent {
  text: string;
  banner:boolean;
  constructor(
    private usersService: UsersService,
    private feedbacksService: FeedbacksService,
    private datePipe: DatePipe,
    private ref: ChangeDetectorRef
  ) { }

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
