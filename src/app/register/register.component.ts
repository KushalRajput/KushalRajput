import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  FormType: any = "";
  userData: any[] = [];
  errorMsg = "";
  constructor(private formBuilder: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.preRequisitesForForm();
  }
  preRequisitesForForm(){
    this.errorMsg = "";
    this.FormType = localStorage.getItem("FormType");
    this.registerForm = this.formBuilder.group({
      userid: [0],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]],
      username: ['', Validators.required],
      company: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*]).{8,30})"), Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required]]
    },
      {
        validators: (control) => {
          if (control.value.password !== control.value.confirmpassword) {
            this.registerForm.controls["confirmpassword"].setErrors({ notSame: true });
          }
          return null;
        },
      })
    if (this.FormType == "Job Seeker") {
      delete this.registerForm.controls["company"];
    }
  }
  registerUser() {
    this.errorMsg = "";
    console.log("Form: ", JSON.stringify(this.registerForm.value));
    this.userData = [];

    let DetailsOfUser: any = localStorage.getItem(this.FormType);
    if (DetailsOfUser) {
      this.userData = JSON.parse(DetailsOfUser);
      let indexForMail = this.userData.findIndex(element => (element["mail"]).toLowerCase() == (this.registerForm.controls["mail"].value).toLowerCase());
      if (indexForMail !=-1) {
       this.errorMsg = "Email already exists";
        return;
      }
      let indexForUserName = this.userData.findIndex(element => (element["username"]).toLowerCase() == (this.registerForm.controls["username"].value).toLowerCase());
      if (indexForUserName !=-1) {
        this.errorMsg =  "User Name already exists";
        return;
      }
    }
    this.registerForm.controls["userid"].setValue(this.userData.length + 1);
    this.userData.push(JSON.parse(JSON.stringify(this.registerForm.value)));
    localStorage.setItem(this.FormType, JSON.stringify(this.userData));
  alert("Your user has been registered successfully.");
  this.routeToLogin();
  }
  routeToLogin() {
    this.registerForm.reset();
    this.router.navigateByUrl("/Login");
  }
  resetForm(){
    this.errorMsg = "";
    this.router.navigateByUrl("/Login");
  }
}
