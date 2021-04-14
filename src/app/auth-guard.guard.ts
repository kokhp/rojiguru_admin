import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }
  canActivate(
  ): boolean {
    console.log("AuthGuard is called")
    const token = localStorage.getItem('token');
    if (token) {
      console.log("returning true");
      return true;
      /*
      this.apiService.login().subscribe(
        data => {
          console.log("loggin if Data", data);
          if (!data.success) {
            this.router.navigate[''];
            return true;
          }
        },
        error => {
          console.log("Logging if error", error);
          return false;
        }
      )
      */
    }
    else {
      console.log("sending false")
      this.router.navigate([''])
      return false;
    }
  }
}
