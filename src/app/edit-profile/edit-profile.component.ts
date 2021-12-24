import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicePortalService } from '../services/service-portal.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers:[ServicePortalService]
})
export class EditProfileComponent implements OnInit {
  EditForm!: FormGroup;
  FormType: any = "";
  usersData: any[] = [];
  errorMsg:any;
  userId: any;
  userIndex:any;
  skillsData: any[] = [];
  dropdownSettings = {};
  constructor(private formBuilder: FormBuilder, private router: Router,public servicePortal:ServicePortalService) { }
  ngOnInit(): void {
    this.servicePortal.getDataFromLocalStorage();
    this.preRequisitesForForm();
    this.getDataOfCurrentUser();
    this.getValueOfUser();
  }
  preRequisitesForForm(){
    this.errorMsg = "";
    this.FormType = localStorage.getItem("FormType");
    this.EditForm = this.formBuilder.group({
      userid: [0],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}")]],
      username: ['', Validators.required],
      company: ['', Validators.required],
      skills: [''],
      expyear: ['', [Validators.min(0)]],
      expmonth: ['', [Validators.min(0), Validators.max(11)]],
      title: ['']
    })
    if (this.FormType == "Job Seeker") {
      delete this.EditForm.controls["company"];
      delete this.EditForm.controls["mail"];
      delete this.EditForm.controls["username"];
    }
    else{
      delete this.EditForm.controls["skills"];
      delete this.EditForm.controls["expyear"];
      delete this.EditForm.controls["expmonth"];
      delete this.EditForm.controls["title"];
    }
    this.setMultipleDropdownCheckbox();
  }
  setMultipleDropdownCheckbox() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
    this.skillsData = [
      { item_id: 1, item_text: 'Angular' },
      { item_id: 2, item_text: 'Java' },
      { item_id: 3, item_text: '.Net' },
      { item_id: 4, item_text: 'Node' },
      { item_id: 5, item_text: 'PHP' },
      { item_id: 6, item_text: 'Python' },
      { item_id: 7, item_text: 'Ruby' },
    ];
  }
  getDataOfCurrentUser(){
    let Data=this.servicePortal.usersData;
    this.userIndex=Data.findIndex(element => (element["username"]).toLowerCase() == (this.servicePortal.userName).toLowerCase());;
    this.usersData=Data;
  }
  getValueOfUser(){
    this.userId=this.usersData[this.userIndex].userid;
    this.EditForm.patchValue({
      firstname: this.usersData[this.userIndex].firstname,
      lastname: this.usersData[this.userIndex].lastname,
    });
    if(this.FormType=="Employer"){
      this.EditForm.patchValue({
        mail: this.usersData[this.userIndex].mail,
        username: this.usersData[this.userIndex].username,
        company:this.usersData[this.userIndex].company
      });
    }
    else{
      this.EditForm.patchValue({
        expyear: this.usersData[this.userIndex].expyear,
        expmonth: this.usersData[this.userIndex].expmonth,
        title:this.usersData[this.userIndex].title,
        skills:this.usersData[this.userIndex].skills
      });
    }
  }
  updateUser() {
    this.errorMsg = "";
    console.log("Form: ", JSON.stringify(this.EditForm.value));
    if(this.FormType=="Employer"){
      let indexForMail = this.usersData.findIndex(element => ((element["mail"]).toLowerCase() == (this.EditForm.controls["mail"].value).toLowerCase()) && (element["userid"]) != (this.userId));
      if (indexForMail !=-1) {
      this.errorMsg = "Email already exists";
        return;
      }
      let indexForUserName = this.usersData.findIndex(element => ((element["username"]).toLowerCase() == (this.EditForm.controls["username"].value).toLowerCase()&& (element["userid"]) != (this.userId)));
      if (indexForUserName !=-1) {
      this.errorMsg = "User Name already exists";
        return;
      }
    }
     this.usersData[this.userIndex].firstname=this.EditForm.value.firstname;
     this.usersData[this.userIndex].lastname=this.EditForm.value.lastname;
   
    if(this.FormType=="Employer"){
      this.usersData[this.userIndex].mail=this.EditForm.value.mail;
      this.usersData[this.userIndex].username=this.EditForm.value.username;
      this.usersData[this.userIndex].company=this.EditForm.value.company;
    }
    else{  
      this.usersData[this.userIndex].expyear=this.EditForm.value.expyear;
      this.usersData[this.userIndex].expmonth=this.EditForm.value.expmonth;
      this.usersData[this.userIndex].title=this.EditForm.value.title;
      this.usersData[this.userIndex].skills=this.EditForm.value.skills;
    }
    localStorage.setItem(this.FormType, JSON.stringify(this.usersData));
    alert("Your profile has been updated successfully.");
    this.routeToDashboard();
  }
  routeToDashboard() {
    this.EditForm.reset();
    this.router.navigateByUrl("/Dashboard");
  }
  resetForm(){
    this.errorMsg = "";
    this.router.navigateByUrl("/Dashboard");
  }

}
