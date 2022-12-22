import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public common : CommonService, public router: Router){

  }
  canActivate(){
    let token = localStorage.getItem('authToken');
    if(token !== null && token !== undefined){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
  
}
