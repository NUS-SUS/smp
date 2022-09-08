import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Payment, PaymentModel } from '../../interfaces/Payment';
import { UsersService } from '../../services/users.service';
import { User, UserModel } from '../../interfaces/User';
import { ActivatedRoute,Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Location } from "@angular/common"; 

@Component({
  selector: 'app-checkout-complete',
  templateUrl: './checkout-complete.component.html',
  styleUrls: ['./checkout-complete.component.css']
})
export class CheckoutCompleteComponent implements OnInit {
  newCredit:number;
  totalCredit:number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private route:Router,
    private paymentService: PaymentService,
    private usersService: UsersService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      switchMap((params: Params) => {
        return this.paymentService.getPayment(params['paymentId']);
      }),
      switchMap((payment: Payment) => {
        this.newCredit = payment.AMOUNT;
        return this.usersService.getUser(payment.COMPANIES_ID);
      })
    ).subscribe((user:UserModel)=>{
      this.totalCredit=user.CAMPAIGN_FUNDS;
      this.location.replaceState("checkout-complete");
    });
  }

}
