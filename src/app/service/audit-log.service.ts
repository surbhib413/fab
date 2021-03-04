import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs';
import { ApolloModule, Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { environment } from './../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditLogService {

  BASEURL = environment.loc_microservice;
  //BASEURL = "https://34.83.143.14/loc"
  token = window.localStorage.getItem('currentUser')
  form_id = ''

  auditLogs: any[];

  constructor(private http: HttpClient, private apollo: Apollo, private httpLink: HttpLink) { }

  getAuditLogs(cb, uuid) {
    this.apollo.watchQuery({
      query: gql`{
        getAuditLogsByFormUuid( uuid: "${uuid}" ){
          user
          activity
          date
        }
      }`,
      context: {
        // headers:{
        //   authorization: `Bearer ${this.token}`
        // },
        uri: this.BASEURL+'/graphql/'
      }
    })
    .valueChanges.subscribe(result => {
      // console.log("returned from query", result.data['getAuditLogsByFormUuid']);
      cb(result.data['getAuditLogsByFormUuid']);

    });
  }

  sendAuditLogs(data){
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.token}`)
    }
    return this.http.post(this.BASEURL + '/auditlog', data)
  }

}
