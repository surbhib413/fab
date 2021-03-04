import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.scss']
})

// export class User {
//   constructor(public email: string,
//     public password: string) {
//   }
// }

export class LoginContentComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  hiddenPassword: boolean = true;
  visiblePassword: boolean = false;
  passwordInputType: string = "password";
  invalidCredentials: boolean = false;

  // @Output() loggedIn = new EventEmitter<User>();

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router, private route: ActivatedRoute, private sharedService: SharedService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      login_username: this.fb.control('', Validators.required),
      login_password: this.fb.control('', Validators.required),
    });

    // reset login status
    // this.authService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    const currentUser = this.authService.isLoggedin();
    if (currentUser) {
      this.router.navigate(['/dashboard']);
    }

  }



  login() {
    // this.loggedIn.emit(
    //   new User(
    //     this.loginForm.value.login_username,
    //     this.loginForm.value.login_password
    //   )
    // );

    this.authService.saveLogin(this.loginForm.value).subscribe(
      response => {
        var res = JSON.parse(JSON.stringify(response));
        console.log("login res" + JSON.stringify(res));
        console.log("This is response", response);
        localStorage.setItem('currentUser', response['data'][0].token);
        localStorage.setItem('role', response['data'][0].role);
        localStorage.setItem('userId', this.loginForm.value.login_username);
        localStorage.setItem('profile_url', response['data'][0].profile_url);
        console.log("Response from login API" + response);
        //console.log("idddddddddddddddddddddddddddd"+this.loginForm.value.login_username)
        //this.updateUserId(this.loginForm.value.login_username);
        this.router.navigate(['/dashboard']);
      },
      err => {
        if (err.status == 403) {
          this.invalidCredentials = true;
        }
        console.log("Error occured in login form" + JSON.stringify(err));
      }
    );
  }

  // updateUserId(userId) {
  //   this.sharedService.updateUserId(userId)
  // }

  showPassword() {
    this.passwordInputType = "password";
    this.visiblePassword = false;
    this.hiddenPassword = true;
  }

  hidePassword() {
    this.passwordInputType = "text";
    this.hiddenPassword = false;
    this.visiblePassword = true;
  }

}
