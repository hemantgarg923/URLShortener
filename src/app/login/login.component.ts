import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email="";
  password="";
  isEmailValid = true;
  isPasswordValid = true;
  isCorrectCredentials = true;

  constructor(public http: HttpClient, public router: Router, public common: CommonService) { }

  ngOnInit(): void {
  }

  checkEmailValidity(email){
    let regex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+$/
    let value = email.value;
    this.email = value;
    if(regex.test(value)){
      this.isEmailValid = true;
    }
    else{
      this.isEmailValid = false;
    }
  }

  checkPasswordValidity(password){
    let value = password.value;
    this.password = value;
    if(value.length<4){
      this.isPasswordValid = false;
    }
    else{
      this.isPasswordValid = true;
    }
  }

  enableDisableLogin(){
    if(this.isEmailValid && this.isPasswordValid && this.email.length!==0 && this.password.length !==0){
      return false;
    }
    return true;
  }

  login(){
    let dataObj = {email: this.email, password: this.password};
    this.http.post(this.common.loginURL, dataObj).subscribe((data: any)=>{
      if(data!== null && data !== undefined && data !== ""){
        this.common.isUserLoggedIn = true;
        this.isCorrectCredentials = true;
        localStorage.setItem('authToken', data.token);
        this.router.navigate(['home']);
      }
      else{
        this.isCorrectCredentials = false;
      }
      
    }, (error)=>{
      console.log(error);
      this.isCorrectCredentials = false;
    })
  }

  signup(){
    this.router.navigate(['signup']);
  }

}
