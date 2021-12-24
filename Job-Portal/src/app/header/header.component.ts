import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePortalService } from '../services/service-portal.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[ServicePortalService]
})
export class HeaderComponent implements OnInit {
  userName:any="";
  constructor(public routes:Router,public servicePortal:ServicePortalService) { }
  ngOnInit(){
    this.servicePortal.getDataFromLocalStorage();
    this.userName = this.servicePortal.userName;   
    if(!this.userName){
      this.routes.navigateByUrl("/Home");
    }
    else{
   //   this.routes.navigateByUrl("/Dashboard");
    }
  }
  editProfile(){
    this.routes.navigateByUrl("/EditProfile");
  }
  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("fromlogin");
    localStorage.removeItem("userid");
    localStorage.removeItem("FormType");
    this.routes.navigateByUrl("/Home");
  }
}
