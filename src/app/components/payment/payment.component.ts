// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.css']
// })
// export class PaymentComponent implements OnInit {

//   paymentHandler:any = null;

//   constructor() { }

//   ngOnInit() {
//     this.invokeStripe();
//   }
  
//   makePayment(amount: any) {
//     const paymentHandler = (<any>window).StripeCheckout.configure({
//       key: 'pk_test_51Lf1vhKeqC5GsAgqJPXct0k3qE2BHBegOictCp0vM9nSR9CUGcLz2zB2wVFHEnhQJKJih3yDla1VeNbWZUQv3nCA005eGX0OiI',
//       locale: 'auto',
//       token: function (stripeToken: any) {
//         console.log(stripeToken)
//         alert('Stripe token generated!');
//       }
//     });
  
//     paymentHandler.open({
//       name: 'Positronx',
//       description: '3 widgets',
//       amount: amount * 100
//     });
//   }
  
//   invokeStripe() {
//     if(!window.document.getElementById('stripe-script')) {
//       const script = window.document.createElement("script");
//       script.id = "stripe-script";
//       script.type = "text/javascript";
//       script.src = "https://checkout.stripe.com/checkout.js";
//       script.onload = () => {
//         this.paymentHandler = (<any>window).StripeCheckout.configure({
//           key: 'pk_test_51Lf1vhKeqC5GsAgqJPXct0k3qE2BHBegOictCp0vM9nSR9CUGcLz2zB2wVFHEnhQJKJih3yDla1VeNbWZUQv3nCA005eGX0OiI',
//           locale: 'auto',
//           token: function (stripeToken: any) {
//             console.log(stripeToken)
//             alert('Payment has been successfull!');
//           }
//         });
//       }
        
//       window.document.body.appendChild(script);
//     }
//   }

// }
