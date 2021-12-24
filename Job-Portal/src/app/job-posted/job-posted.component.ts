import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicePortalService } from '../services/service-portal.service';

@Component({
  selector: 'app-job-posted',
  templateUrl: './job-posted.component.html',
  styleUrls: ['./job-posted.component.css'],
  providers:[ServicePortalService,DatePipe]
})
export class JobPostedComponent implements OnInit {
  JobsData:any[]=[];
  PostedJobs:any[]=[];
  FormType:any="";
  userName:any="";
  DashboardType:any="";
  searchFilter:any="";
  FilterOn: any = {};
  SortOrder:boolean=true;
  constructor(private router:Router,public servicePortal:ServicePortalService) { 
    let States=(this.router.getCurrentNavigation()!.extras.state);
    if(States){
      this.DashboardType = States['name'];
    }
  }

  ngOnInit(): void {
    this.servicePortal.getDataFromLocalStorage();
    this.searchFilter = "";    
    this.FilterOn["JobTitle"] = "";
    this.FormType=this.servicePortal.FormType;
    this.userName=this.servicePortal.userName;
    this.SortOrder=true;
    this.servicePortal.getDataFromLocalStorage();
    this.getAllPostedJobs();
  }
  getAllPostedJobs(){
    this.JobsData=this.servicePortal.JobsPosted;
    this.getDataBasedOnDashboardType();
    this.sortFunction('JobTitle')
  }
  getDataBasedOnDashboardType(){
    switch(this.DashboardType){
      case "Posted Jobs":
        this.PostedJobs=this.JobsData;
        break;
      case "Applied Jobs":
        this.PostedJobs=this.JobsData.filter(value=>{return this.checkIsApplied(value.ApplicationDetails,this.userName)});
        break;
    }
  }
  checkIsApplied(Data:any[],Name:string){
      let Item=Data.filter(value=>{return (value['username'].toLowerCase())==(Name.toLowerCase())});
      return Item.length>0?true:false;
  }
  CreateUpdateJob(JobType:string,JobId:number){
    this.router.navigateByUrl('/Manage-Job', { state: { id:1 , name:JobType,JobID:JobId,DashboardType:this.DashboardType } });
  }
  CancelApplication(JobItem:any){
     for(let index=0;index<JobItem.ApplicationDetails.length;index++){
       let Obj=JobItem.ApplicationDetails[index];
       if((Obj.username.toLowerCase())==(this.userName.toLowerCase())){
        JobItem.ApplicationDetails.splice(index,1);
       }
     }
     this.updateAllData(JobItem);
  }
  updateAllData(JobItem:any){
    let JobData=this.JobsData;
    let Index=JobData.findIndex(element=>{ element.JobID==JobItem.JobID});
    JobData[Index]=JobItem;
    localStorage.setItem("JobsPosted", JSON.stringify(JobData));
    alert("Your application cancelled successfully.");
    this.ngOnInit();
  }
  applyOnJob(JobType:string,JobId:number){
    this.router.navigateByUrl('/AppliedOnJob', { state: { id:1 , name:JobType,JobID:JobId,DashboardType:this.DashboardType } });
  }
  sortFunction(Property:string){
    if(this.SortOrder){
      this.PostedJobs.sort((a,b)=>{
        a= a[Property].toLowerCase();
        b= b[Property].toLowerCase();
        return a.localeCompare(b);
      });
      this.SortOrder=false;
    }
    else{
      this.PostedJobs.sort((a,b)=>{
        a= a[Property].toLowerCase();
        b= b[Property].toLowerCase();
        return b.localeCompare(a);
      });
      this.SortOrder=true
    }
  } 
  navigateToDashboard(){
    this.router.navigateByUrl("/Dashboard");
  }
}
