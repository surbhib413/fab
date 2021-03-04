import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  token = '';
  loginForm: {};
  jwtHelper = new JwtHelperService();
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

//   public get currentUserValue(): User {
//     alert(this.currentUserSubject.value);
//     return this.currentUserSubject.value;
// }

  saveLogin(value) {
    this.generateLoginFormObject(value);
    return this.http.post(environment.auth_microservice + '/user/', this.loginForm);
    
      // .pipe(
      //   user => {
      //       if (user && user['data'][0]) {
      //         this.isLoggedin(user);
      //         // store user details and jwt token in local storage to keep user logged in between page refreshes
      //         localStorage.setItem('currentUser', user['data'][0].token);
      //         // this.currentUserSubject.next(user.token);
      //     }
      //     return user;
      // });
      
  }

  isLoggedin(){
    const token = localStorage.getItem('currentUser');
    // console.log("token aftr login",token);
    return token;
    // return !this.jwtHelper.isTokenExpired(token);
  }

  

  generateLoginFormObject(value) {
    this.loginForm = {
      user_id: value.login_username,
      password: value.login_password
    }

  }
}
