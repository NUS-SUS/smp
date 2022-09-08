import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User, UserModel } from '../../interfaces/User';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from '../../services/payment.service';
import { Payment, PaymentModel } from '../../interfaces/Payment';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.css']
})
export class CheckoutSuccessComponent implements OnInit {
  generateId: string;
  loading: boolean = true;
  cost: number;
  message: string;
  newPayment: Payment;
  routeValue: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private route:Router,
    private usersService: UsersService,
    private paymentService: PaymentService,
    private http: HttpClient
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      switchMap((params: Params) => {
        this.generateId = params['generateId'];
        this.getCost(params['priceId']);
        return this.usersService.getCurrentUser();
      }),
      switchMap((user: UserModel) => {
        this.processPayment(user);
        user.CAMPAIGN_FUNDS = parseInt(user.CAMPAIGN_FUNDS.toString()) + parseInt(this.cost.toString());
        return this.usersService.updateUser(user);;
      }),
      switchMap((user: User) => {
        return this.paymentService.addPayment(this.newPayment);
      })
    ).subscribe(payment => {
      this.route.navigate(['checkout-complete'], { queryParams: { paymentId: payment.PAYMENTS_ID }});
    });
  }
  private getCost(priceId: string){
    switch(priceId){
      case "price_1JeiMhIs1V0ZAkpPMGW7mEB2":
        this.cost = 10;
        break;
      case "price_1JeiMhIs1V0ZAkpPxskv5c5Z":
        this.cost = 50;
        break;
      case "price_1JeiMhIs1V0ZAkpP1et67ana":
        this.cost = 100;
        break;
    }
  } 
  private processPayment(user: User) {
    this.newPayment = new PaymentModel();
    this.newPayment.PAYMENTS_ID = this.generateId;
    this.newPayment.AMOUNT = this.cost;
    this.newPayment.CAMPAIGN_FUNDS_PURCHASED = this.cost;
    this.newPayment.COMPANIES_ID = user.EMAIL;
    this.newPayment.PAYMENT_STATUS = "Success";
    this.newPayment.PAYMENT_TYPE = "Stripe";
    this.newPayment.TRANSACTION_ID = this.generateId;
  };
}
