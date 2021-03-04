import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

   }

   getUsers(cb){
      return this.http.get('https://fab-server.herokuapp.com/',{responseType: 'text'}).subscribe((res)=>{
      //return this.http.get('http://localhost:2000/',{responseType: 'text'}).subscribe((res)=>{
      
          console.log("This is the response from the server",res);
          cb(res);
      },error =>{
        console.log("There is an error that I am getting",error);
    });
   }
}
