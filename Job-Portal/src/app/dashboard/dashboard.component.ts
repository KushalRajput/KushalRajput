import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePortalService } from '../services/service-portal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[ServicePortalService]
})
export class DashboardComponent implements OnInit {
  JobsData:any[]=[];
  FormType:any;
  userName:any="";
  JobCount:number=0;
  ApplicationCount:number=0;
  AppliedCount:number =0;
  constructor(private routes:Router,public servicePortal:ServicePortalService) { }

  ngOnInit(): void {
    this.servicePortal.getDataFromLocalStorage();
    this.getLoginUserRelatedDetails();
  }
  getLoginUserRelatedDetails(){
    this.FormType=this.servicePortal.FormType;
    this.userName=this.servicePortal.userName;
    this.getAllPostedJobs();
  }
  getAllPostedJobs(){
    let JobsData=this.servicePortal.JobsPosted;
    if(this.FormType=="Employer"){
      JobsData=JobsData.filter(value=>{return (value.UserDetails['username'].toLowerCase())==(this.userName.toLowerCase())});
      this.ApplicationCount= this.servicePortal.getCountFromPostedJobs(JobsData,"Application Count");
    }
    else{
      this.AppliedCount= this.servicePortal.getCountFromPostedJobs(JobsData,"Applied Count");
    }
    this.JobCount=this.servicePortal.getCountFromPostedJobs(JobsData,"Job Count");
  }
  NavigateToRoutes(JobType:string){
    this.routes.navigateByUrl('/Job-Dashboard', { state: { id:1 , name:JobType} });
  }
 
}
