import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  longURL  = "";
  shortURL;

  constructor(public http: HttpClient, public common: CommonService, public router: Router) { }

  ngOnInit(): void {
    this.shortURL = "";

    let token = localStorage.getItem('authToken');
    this.http.post(this.common.getUser, {headers: {'authToken': token}}).subscribe((data)=>{
      
    }, (error)=>{
      console.log(error);
      this.router.navigate(['login']);
    })
  }

  shortenURL(){
    let dataObj = {longLink: this.longURL};
    this.http.post(this.common.shortApi, dataObj).subscribe((data)=>{
      if(data !== null && data !== undefined && data !== ""){
        this.shortURL = data;
      }
      else{
        this.shortURL = "";
      }
    }, (error)=>{
      console.log(error);
    })
  }

  copyLink(){
    navigator.clipboard.writeText(this.shortURL);
  }

}
