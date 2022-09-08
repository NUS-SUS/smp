import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { StripeService } from 'ngx-stripe';
import { User } from '../../interfaces/User';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {

  user: User;
  constructor(
    private http: HttpClient,
    private stripeService: StripeService,
    private usersService: UsersService,
  ) {
    this.usersService.getCurrentUser().subscribe(user => this.user = user);
  }


  checkout(priceId) {
    const generateId = Date.now().toString();

    this.stripeService.redirectToCheckout({
      lineItems: [{
        price: priceId,
        quantity: 1,
      }],
      successUrl: `${window.location.origin}/checkout-success?generateId=${generateId}&priceId=${priceId}`,
      cancelUrl: `${window.location.origin}/checkout`,
      mode: 'payment',
      clientReferenceId: generateId,
      customerEmail: this.user.EMAIL
    })
      .subscribe(result => {
        if (result.error) {
          alert(result.error.message);
        }
      });
  }
}