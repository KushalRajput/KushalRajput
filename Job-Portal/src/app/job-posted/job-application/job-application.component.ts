import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicePortalService } from 'src/app/services/service-portal.service';


@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css'],
  providers:[ServicePortalService]
})
export class JobApplicationComponent implements OnInit {
  ApplyPostingForm!: FormGroup;
  JobType: any;
  JobID:number=0;
  userData: any[] = [];
  JobData: any[] = [];
  errorMsg:any
  userId: any;
  userIndex:any;
  JobIndex:any;
  DashboardType:any="";
  skillsData: any[] = [];
  dropdownSettings = {};
  constructor(private formBuilder: FormBuilder, private router: Router,public servicePortal:ServicePortalService) { 
    let States=(this.router.getCurrentNavigation()!.extras.state);
    if(States){
      this.JobType=States['name'];
      this.JobID=States['JobID'];
      this.DashboardType=States['DashboardType']
    }
  }
  ngOnInit(): void {
    this.servicePortal.getDataFromLocalStorage();
    this.preRequisitesForForm();
    this.getDataOfCurrentJob();
  
  }
  preRequisitesForForm(){
    this.errorMsg = "";
    this.ApplyPostingForm = this.formBuilder.group({
      JobHeadLine: ['', Validators.required],
      CoverLetter: ['', Validators.required],
    })
  }
  getDataOfCurrentJob(){
    let Data=this.servicePortal.JobsPosted;
    this.JobIndex=Data.findIndex(element => (element["JobID"]) == (this.JobID));
    this.JobData=Data;
    this.getDataOfCurrentUser();
  }
  getDataOfCurrentUser(){
    let Data=this.servicePortal.usersData;
    this.userData=(Data.filter(element => (element["username"]).toLowerCase() == (this.servicePortal.userName).toLowerCase()));
  }
  applyForJob() {
    let JobData:any=[];
    if(this.JobData){
      JobData=this.JobData;
    }
    let UserData=this.userData[0];
    UserData['JobHeadLine']=this.ApplyPostingForm.value.JobHeadLine;
    UserData['CoverLetter']=this.ApplyPostingForm.value.CoverLetter;
    UserData['AppliedOn']=new Date();
    JobData[this.JobIndex].ApplicationDetails.push(UserData);
    localStorage.setItem("JobsPosted", JSON.stringify(JobData));
    alert("Your application submitted successfully.");
    this.routeToJobDashboard();
  }
  routeToJobDashboard() {
    this.ApplyPostingForm.reset();
    this.router.navigateByUrl('/Job-Dashboard', { state: { id:1 , name:this.DashboardType} });
  }
  resetForm(){
    this.errorMsg = "";
    this.router.navigateByUrl('/Job-Dashboard', { state: { id:1 , name:this.DashboardType} });
  }


}
