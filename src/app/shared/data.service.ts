import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable()
export class DataService {
  isLogin: boolean;

  constructor(private httpClient: HttpClient) {
    this.isLogin = false;   
  }

  getJSON(): Observable<any> {
    return this.httpClient.get("assets/myjson.json");
  }

  doLogin() {
    this.isLogin = true;
    localStorage.setItem('isLogin', String(this.isLogin));
  }

  isLoggedIn() {
    if ((localStorage.getItem('isLogin')) && (localStorage.getItem('isLogin') == 'true')) {
      this.isLogin = true;
    }
    return this.isLogin;
  }

  doLogout() {
    this.isLogin = false;
    localStorage.removeItem('isLogin');
  }

  saveJSON(data:string) {
    // localStorage.removeItem('json_empData');
    // localStorage.setItem('json_empData',data);
  }  

}


