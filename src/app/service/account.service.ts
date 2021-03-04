import { Injectable } from "@angular/core";
import { ApolloModule, Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private httpLink: HttpLink
  ) { }
  BASEURL = environment.account_microservice;
  getAccount(cb) {
    const clientName = "deloitte middle east";
    this.apollo
      .watchQuery({
        query: gql`
        {
          getAccountsByClient(client_name: "${clientName}"){
            entity_name
            bank_name
            branch_name
            account_name
            account_number
            account_type
            account_base_currency
            available_balance
            balance_in_aed
          }
        }`,
        context: {
          // headers: {
          // authorization: `Bearer ${this.token}`
          // },
          uri: this.BASEURL + "/graphQl/"
        }
      })
      .valueChanges.subscribe(
        res => {
          //console.log("Account List", res);
          cb(res.data["getAccountsByClient"], null);
        },
        err => {
          cb(null, err);
        }
      );
  }

  getAccountsData(cb, groupName, key, value) {
    const clientName = "deloitte middle east";
    if (key === "entity_name") {
      value = value.toLowerCase();
    }
    this.apollo
      .watchQuery({
        query: gql`
        {
          getAccountsDataByClient(client_name:"${clientName}",
           group: "${groupName.toLowerCase()}", match_key: "${key}", match_value: "${value}"){
            keys,
            sum_values,
            percentages
          }
        }`,
        context: {
          // headers: {
          //   authorization: `Bearer ${this.token}`
          // },
          uri: this.BASEURL + "/graphQl/"
        }
      })
      .valueChanges.subscribe(
        res => {
          //console.log("Graph Data", res);
          cb(res.data["getAccountsDataByClient"], null);
        },
        err => {
          cb(null, err);
        }
      );
  }

  getLineChartData(cb, start_date, end_date) {
    const clientName = "deloitte middle east";
    this.apollo
      .watchQuery({
        query: gql`
        {
          getTransactionsByDate(client_name: "deloitte middle east", start_date: "${end_date}", end_date: "${start_date}"){
            available_balance,
            transaction_date
          }
        }`,
        context: {
          // headers: {
          //   authorization: `Bearer ${this.token}`
          // },
          uri: this.BASEURL + "/graphQl/"
        }
      })
      .valueChanges.subscribe(
        res => {
          //console.log(" graph Data", res);
          cb(res.data["getTransactionsByDate"], null);
        },
        err => {
          cb(null, err);
        }
      );
  }

  getAccountsCountByClient(cb, clientName) {
    clientName = "deloitte middle east";
    this.apollo
      .watchQuery({
        query: gql`
        {
          getAccountsCountByClient(client_name:"${clientName}"){
            bank_names,
            counts,
            total_balances
          }
        }`,
        context: {
          // headers: {
          //   authorization: `Bearer ${this.token}`
          // },
          uri: this.BASEURL + "/graphQl/"
        }
      })
      .valueChanges.subscribe(
        res => {
          //console.log("CountByClient", res);
          cb(res.data["getAccountsCountByClient"], null);
        },
        err => {
          cb(null, err);
        }
      );
  }

  getForecastData() {
    //return this.http.get(this.BASEURL + '/forecast/');
    return this.http.get("https://130.211.207.174/getforecast");
  }

  getAccountBalanceData(cb, start_date, end_date) {
    const clientName = "deloitte middle east";
    this.apollo
      .watchQuery({
        query: gql`
        {
          getAccountsSumByDate(client_name: "deloitte middle east", start_date: "${start_date}", end_date: "${end_date}"){
            dates,
            total_balances
          }
        }`,
        context: {
          // headers: {
          //   authorization: `Bearer ${this.token}`
          // },
          uri: this.BASEURL + "/graphQl/"
        }
      })
      .valueChanges.subscribe(
        res => {
          //console.log("getAccountBalanceData--------------", res);
          cb(res.data["getAccountsSumByDate"], null);
        },
        err => {
          cb(null, err);
        }
      );
  }

  getPercentageChange(cb, start_date, end_date) {
    const clientName = "deloitte middle east";
    this.apollo
      .watchQuery({
        query: gql`
        {
          getPercentageChange(client_name: "deloitte middle east", start_date: "${start_date}", end_date: "${end_date}"){
            percentage_change
          }
        }`,
        context: {
          // headers: {
          //   authorization: `Bearer ${this.token}`
          // },
          uri: this.BASEURL + "/graphQl/"
        }
      })
      .valueChanges.subscribe(
        res => {
          //console.log("getAccountBalanceData--------------", res);
          cb(res.data["getPercentageChange"], null);
        },
        err => {
          cb(null, err);
        }
      );
  }

  getBalanceForStackedBar(cb, entity_name: Array<string>, bank_name: Array<string>, region: Array<string>) {
    const clientName = "deloitte middle east";
    this.apollo
      .watchQuery({
        query: gql`
        {
          getBalanceForStackedBar(client_name: "${clientName}", entity_name: [${entity_name}],bank_name:[${bank_name}],region:[${region}]){
            entity_name,
            bank_wise_balance
            {
              bank_name,
              balance
            }
          }
        }`,
        context: {
          // headers: {
          //   authorization: `Bearer ${this.token}`
          // },
          uri: this.BASEURL + "/graphQl/"
        }
      })
      .valueChanges.subscribe(
        res => {
          // console.log("getBalanceForStackedBar--------------", res);
          cb(res.data["getBalanceForStackedBar"], null);
        },
        err => {
          cb(null, err);
        }
      );
  }

  getBalanceForHeatMap(cb, entity_name: Array<string>, bank_name: Array<string>, region: Array<string>) {
    const clientName = "deloitte middle east";
    this.apollo
      .watchQuery({
        query: gql`
        {
          getBalanceForHeatMap(client_name: "${clientName}", entity_name: [${entity_name}],bank_name:[${bank_name}],region:[${region}]){
            entity_name,
            region_wise_balance
            {
              region,
              balance
            }
          }
        }`,
        context: {
          // headers: {
          //   authorization: `Bearer ${this.token}`
          // },
          uri: this.BASEURL + "/graphQl/"
        }
      })
      .valueChanges.subscribe(
        res => {
          // console.log("getBalanceForHeatMap", res);
          cb(res.data["getBalanceForHeatMap"], null);
        },
        err => {
          cb(null, err);
        }
      );
  }
  getAccountDetails(cb, accountNum: string) {
    const clientName = "deloitte middle east";
    this.apollo
      .watchQuery({
        query: gql`
        {
          getAccount(account_number:"${accountNum}"){
            account_number,
            client_name,
            entity_name,
            account_name,
            account_base_currency,
            account_type,
            bank_name,
            account_category,
            branch_name,
            iban,
            bic,
            status,
            overdraft_limit,
            previous_day_balance,
            available_balance,
            frozen_balance,
            createdAt
          }
        }`,
        context: {
          // headers: {
          //   authorization: `Bearer ${this.token}`
          // },
          uri: this.BASEURL + "/graphQl/"
        }
      })
      .valueChanges.subscribe(
        res => {
          // console.log("getBalanceForHeatMap", res);
          cb(res.data["getAccount"], null);
        },
        err => {
          cb(null, err);
        }
      );
  }

  getDoughnutData(cb, type, accountNum, group, sum) {
    this.apollo
      .watchQuery({
        query: gql`
        {
          getTransactionsDataByAccount(type:[${type}],account_number:"${accountNum}",group:"${group}",sum:"${sum}"){
            keys,
            sum_values,
            percentages
          }
        }`,
        context: {
          // headers: {
          //   authorization: `Bearer ${this.token}`
          // },
          uri: this.BASEURL + "/graphQl/"
        }
      })
      .valueChanges.subscribe(
        res => {
          // console.log("getTransactionsDataByAccount", res);
          cb(res.data["getTransactionsDataByAccount"], null);
        },
        err => {
          cb(null, err);
        }
      );
  }


  getTransactionsDataByClient(cb, type, group) {
    const clientName = "deloitte middle east";
    this.apollo
      .watchQuery({
        query: gql`
        {
          getTransactionsDataByClient(client_name: "${clientName}",type:"${type}",group:"${group}"){
            keys,
            sum_values
          }
        }`,
        context: {
          // headers: {
          //   authorization: `Bearer ${this.token}`
          // },
          uri: this.BASEURL + "/graphQl/"
        }
      })
      .valueChanges.subscribe(
        res => {
          console.log("getTransactionsDataByClient", res);
          cb(res.data["getTransactionsDataByClient"], null);
        },
        err => {
          cb(null, err);
        }
      );
  }



}
