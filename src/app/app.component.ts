import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../app/service/user.service';
import { Observable } from 'rxjs';
import { DataModel } from 'src/app/data/data.model';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fab';

  data: Observable<DataModel>;

  constructor(private http: HttpClient) {
    this.data = this.http.get<DataModel>('data/data.json');
    // console.log(this.data);
  }

}
