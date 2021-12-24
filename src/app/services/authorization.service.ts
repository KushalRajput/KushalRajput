import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  getStatusOfLogin(){
    let UserName = localStorage.getItem("username");
    return (UserName) ? true : false
  }
  
}
