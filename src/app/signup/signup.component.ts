import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email="";
  password="";
  isEmailValid = true;
  isPasswordValid = true;
  isPasswordMatching = true;

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

  checkPasswordMatching(confirmPassword){
    let value = confirmPassword.value;
    if(value !== this.password){
      this.isPasswordMatching = false;
    }
    else{
      this.isPasswordMatching = true;
    }
  }

  signupUser(){
    let dataObj = {email: this.email, password: this.password};
    this.http.post(this.common.signupURL, dataObj).subscribe((data: any)=>{
      if(data!== null && data !== undefined && data !== ""){
        localStorage.setItem('authToken', data.token);
        this.router.navigate(['login']);
      }
    })
  }

}
