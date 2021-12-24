import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServicePortalService } from '../services/service-portal.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ServicePortalService]
})
export class LoginComponent implements OnInit {
  FormType: any = "";
  usersData: any[] = [];
  loginForm!: FormGroup;
  errorMsg: string = "";  
  userName:any = ""

  constructor(private router: Router, private formBuilder: FormBuilder,public servicePortal:ServicePortalService) { }
  ngOnInit(): void {
    this.preRequisitesForForm();
  }
  preRequisitesForForm(){
    this.FormType = localStorage.getItem("FormType");
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  login() {
    this.errorMsg = "";
    this.usersData = [];
    let usersdata: any;
    usersdata = localStorage.getItem(this.FormType);
    if (usersdata) {
      this.usersData = JSON.parse(usersdata);
      let index = this.usersData.findIndex(element => (element["username"]).toLowerCase() == (this.loginForm.controls["username"].value).toLowerCase());
      if (index !=-1) {
        if (this.usersData[index]["password"] == this.loginForm.controls["password"].value) {
          localStorage.setItem("username", this.usersData[index]["username"]);
          localStorage.setItem("userid", this.usersData[index]["userid"]);
          this.userName = this.usersData[index]["username"];
          this.servicePortal.getDataFromLocalStorage();
          this.router.navigateByUrl("/Dashboard");
        }
        else {
          this.errorMsg = "Password is Incorrect";
        }
      }
      else {
        this.errorMsg = "Invalid User Name";
      }
    }
    else {
      this.errorMsg = "Invalid User Name";
    }
  }
}
