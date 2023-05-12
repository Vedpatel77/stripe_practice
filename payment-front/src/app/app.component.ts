import { Component, OnInit } from '@angular/core';
import { PaymentService } from './service/payment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'payment-front';
  handler:any = null;
  success:boolean=false;
  failure:boolean=false;

  ngOnInit(): void {
    this.invokeStripe()
    
  }
  constructor(public service:PaymentService){}

  makepayment(amount:any){
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51N4L26SGiGP9GAYU7KpvwuFphjJjUArgurldiTLYv9okxomFuhjSRGJngpLHfDZhNw0ZcHM1yySZRn7ZE4pHOZrx00CWdmamwZ',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Token Created!!');
        paymentStripe(token);
      }
    });


    const paymentStripe = (token:any) =>{
      this.service.makePayment(token).subscribe((res)=>{
        console.log(res);
        if (res.data === 'success') {
          this.success=true;
        } else {
          this.failure=true;
        }    
      })
    }
  
    handler.open({
      name: 'Aspire',
      description: 'Royal services',
      amount: amount * 100
    });
    
  }


  invokeStripe(){
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51N4L26SGiGP9GAYU7KpvwuFphjJjUArgurldiTLYv9okxomFuhjSRGJngpLHfDZhNw0ZcHM1yySZRn7ZE4pHOZrx00CWdmamwZ',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }
}
