import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public common: CommonService, public router: Router){
    
  }

  logout(){
    this.common.isUserLoggedIn = false;
    localStorage.removeItem('authToken');
    this.router.navigate(['login']);
  }
}
