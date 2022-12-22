import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isUserLoggedIn = false;
  loginURL = "http://localhost:3000/api/auth/login";
  signupURL = "http://localhost:3000/api/auth/createuser";
  shortApi = "http://localhost:3000/api/links/createshortlink";
  getUser = "http://localhost:3000/api/auth/getuser";
  constructor(public http: HttpClient) { }

}
