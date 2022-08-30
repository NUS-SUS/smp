import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Payment, PaymentModel } from '../interfaces/Payment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
    //private REST_API_SERVER = "http://localhost:3000/users";
  // private REST_API_SERVER = "http://localhost:5001/Payments";
  private REST_API_SERVER = "https://xue2n1beqj.execute-api.ap-southeast-1.amazonaws.com/nussmp";

  constructor(private httpClient: HttpClient) { 
  }
  
  public getPayments(): Observable<Payment[]> {
    const url = `${this.REST_API_SERVER}/payments`;
    return this.httpClient.get<Payment[]>(this.REST_API_SERVER,httpOptions);
  }

  public getPayment(PAYMENTS_ID: string): Observable<Payment> {
    const url = `${this.REST_API_SERVER}/payment?PAYMENTS_ID=${PAYMENTS_ID}`;
    return this.httpClient.get<Payment>(url,httpOptions);
  }

  public deletePayment(payment: Payment): Observable<Payment> {
    const url = `${this.REST_API_SERVER}/payment?PAYMENTS_ID=${payment.PAYMENTS_ID}`;
    return this.httpClient.delete<Payment>(url,httpOptions);
  }
  public updatePayment(payment: Payment): Observable<Payment> {
    const url = `${this.REST_API_SERVER}/payment`;
    return this.httpClient.put<Payment>(url, payment, httpOptions);
  }
  public addPayment(payment: Payment): Observable<Payment> {
    const url = `${this.REST_API_SERVER}/payment`;
    return this.httpClient.post<Payment>(url, payment, httpOptions);
  }  
}
