import { Injectable } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient, private apollo: Apollo, private httpLink: HttpLink) { }
  BASEURL = environment.account_microservice;

  getTransactionsByAccount(accountNumber, cb) {
    this.apollo
      .watchQuery({
        query: gql`
        {
          getTransactionsByAccount(account_number:"${accountNumber}"){
            transaction_date
            type
            amount
            narrative
            payment_mode
            tag
            available_balance
          }
        }`,
        context: {
          // headers: {
          //   authorization: `Bearer ${this.token}`
          // },
          uri: this.BASEURL + '/graphQl/'
        },
      })
      .valueChanges.subscribe(res => {
        console.log('Transaction List Service', res);
        cb(res.data['getTransactionsByAccount']);
      }, err => {
        cb(null, err);
      });
  }

  getTransactionsDataByBeneficiary() {
    return this.http.get(this.BASEURL + '/top_beneficiary/data/');
  }

}
