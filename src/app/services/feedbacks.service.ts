import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Feedback } from '../interfaces/Feedback';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {

  private REST_API_SERVER = "https://xue2n1beqj.execute-api.ap-southeast-1.amazonaws.com/nussmp";

  constructor(private httpClient: HttpClient) {
  }

  public getFeedbacks(): Observable<Feedback[]> {
    const url = `${this.REST_API_SERVER}/feedbacks`;
    return this.httpClient.get<Feedback[]>(url, httpOptions);
  }

  public getFeedback(FEEDBACKS_ID: string): Observable<Feedback> {
    const url = `${this.REST_API_SERVER}/feedback?FEEDBACKS_ID=${FEEDBACKS_ID}`;
    return this.httpClient.get<Feedback>(url, httpOptions);
  }

  public deleteFeedback(feedback: Feedback): Observable<Feedback> {
    const url = `${this.REST_API_SERVER}/feedback?FEEDBACKS_ID=${feedback.FEEDBACK_ID}`;
    return this.httpClient.delete<Feedback>(url, httpOptions);
  }
  public updateFeedback(feedback: Feedback): Observable<Feedback> {
    const url = `${this.REST_API_SERVER}/feedback`;
    return this.httpClient.put<Feedback>(url, feedback, httpOptions);
  }
  public addFeedback(feedback: Feedback): Observable<Feedback> {
    const url = `${this.REST_API_SERVER}/feedback`;
    return this.httpClient.post<Feedback>(url, feedback, httpOptions);
  }
}
