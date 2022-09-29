import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users.service';
import { StripeService } from 'ngx-stripe';
import { User } from '../../interfaces/User';
import { environment } from 'src/environments/environment';



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
    this.stripeService.setKey("pk_test_51Lf1vhKeqC5GsAgqJPXct0k3qE2BHBegOictCp0vM9nSR9CUGcLz2zB2wVFHEnhQJKJih3yDla1VeNbWZUQv3nCA005eGX0OiI");
  }
  

  checkout(priceId) {
    const generateId = Date.now().toString();
    //this.stripeService.setKey("pk_test_51Lf1vhKeqC5GsAgqJPXct0k3qE2BHBegOictCp0vM9nSR9CUGcLz2zB2wVFHEnhQJKJih3yDla1VeNbWZUQv3nCA005eGX0OiI");
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