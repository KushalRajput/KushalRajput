import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicePortalService {
    userName:any;
    FormType: any = "";
    usersData: any[] = [];
    JobsPosted:any[]=[];
    getDataFromLocalStorage(){
      this.userName=localStorage.getItem("username");
      this.FormType=localStorage.getItem("FormType");
      this.usersData = [];
      let usersdata: any;
      usersdata = localStorage.getItem(this.FormType);
      if (usersdata) {
        this.usersData = JSON.parse(usersdata);
      }
      let JobsPosted:any;
      JobsPosted=localStorage.getItem("JobsPosted");
      if (JobsPosted) {
        this.JobsPosted = JSON.parse(JobsPosted);
      }
    }
    getCountFromPostedJobs(JobData:any[],CountType:string):number{
      let Count=0;
      switch(CountType){
        case "Job Count":
          Count=JobData.length;
          break;
        case "Application Count":
          for(let property in JobData){
            if(property=="ApplicationDetails"){
              Count+=JobData[property].length;
            }
          }
          break;
        case "Applied Count":
          for(let property in JobData){
            for(let child in JobData[property].ApplicationDetails){
              if((JobData[property].ApplicationDetails[child].username.toLowerCase())==this.userName.toLowerCase()){
                Count++;
             }
            }
          }
          break;
        }
      return Count;
    }
}
