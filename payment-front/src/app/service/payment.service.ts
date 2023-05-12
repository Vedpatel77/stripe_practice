import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  url = 'http://localhost:3000/checkout';

  constructor(private http:HttpClient) { }

  makePayment(stripeToken:any):Observable<any>{
    return this.http.post<any>(this.url,{token:stripeToken})
  }
}
