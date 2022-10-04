import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../interfaces/Payment';
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
    private paymentService: PaymentService  ) {

  }

  ngOnInit(): void {
      this.activatedRoute.queryParams.pipe(
      switchMap((params: Params) => {
        this.generateId = params['generateId'];
        return this.paymentService.getPayment(this.generateId);
      })
    ).subscribe(payment => {
      setTimeout(()=>{
        if(payment.PAYMENTS_ID){
          this.route.navigate(['checkout-complete'], { queryParams: { paymentId: payment.PAYMENTS_ID }});
        }else{
          this.route.navigate(['checkout-cancel']);
        }
      }, 3000);  
    });
  }
}
