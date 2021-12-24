import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicePortalService } from 'src/app/services/service-portal.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css'],
  providers:[ServicePortalService]
})
export class CreateJobComponent implements OnInit {
  JobPostingForm!: FormGroup;
  FormType: any;
  JobID:number=0;
  userData: any[] = [];
  JobData: any[] = [];
  errorMsg:any
  userId: any;
  userIndex:any;
  JobIndex:any;
  skillsData: any[] = [];
  DashboardType:any="";
  dropdownSettings = {};
  constructor(private formBuilder: FormBuilder, private router: Router,public servicePortal:ServicePortalService) { 
    let States=(this.router.getCurrentNavigation()!.extras.state);
    if(States){
      this.FormType=States['name'];
      this.JobID=States['JobID'];
      this.DashboardType=States['DashboardType']
    }
  }
  ngOnInit(): void {
    this.servicePortal.getDataFromLocalStorage();
    this.preRequisitesForForm();
    this.getDataOfCurrentJob();
    if(this.FormType=="Update"){
      this.getValueOfJob();
    }
  }
  preRequisitesForForm(){
    this.errorMsg = "";
    this.JobPostingForm = this.formBuilder.group({
      JobID: [0],
      JobTitle: ['', Validators.required],
      Description: ['', Validators.required],
      Skills: ['', Validators.required],
      expyear: ['', [Validators.required, Validators.min(0)]],
      expmonth: ['', [Validators.required, Validators.min(0), Validators.max(11)]],
      ApplicationDetails: [[]],
      UserDetails: [{}],
      applied:[false]
    })
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
  getDataOfCurrentJob(){
    let Data=this.servicePortal.JobsPosted;
    this.JobIndex=Data.findIndex(element => (element["JobID"]) == (this.JobID));
    this.JobData=Data;
    this.getDataOfCurrentUser();
  }
  getDataOfCurrentUser(){
    let Data=this.servicePortal.usersData;
    this.userData=Data.filter(element => (element["username"]).toLowerCase() == (this.servicePortal.userName).toLowerCase());;
  }
  getValueOfJob(){
    this.JobPostingForm.patchValue({
      JobTitle: this.JobData[this.JobIndex].JobTitle,
      Description: this.JobData[this.JobIndex].Description,
      Skills: this.JobData[this.JobIndex].Skills,
      expyear: this.JobData[this.JobIndex].expyear,
      expmonth: this.JobData[this.JobIndex].expmonth
    });
  }
  postUpdateJob() {
    let JobData:any=[];
    if(this.JobData){
      JobData=this.JobData;
    }
    if(this.FormType=="Post"){
       let JobDetail=(this.JobPostingForm.value);
       JobDetail['JobID']=this.JobData.length;
       JobDetail['UserDetails']=({"userid":this.userData[0].userid,"username":this.userData[0].username});
       JobData.push(JobDetail);
    }
    else{
      JobData[this.JobIndex].JobTitle=this.JobPostingForm.value.JobTitle;
      JobData[this.JobIndex].Description=this.JobPostingForm.value.Description;
      JobData[this.JobIndex].Skills=this.JobPostingForm.value.Skills;
      JobData[this.JobIndex].expyear=this.JobPostingForm.value.expyear;
      JobData[this.JobIndex].expmonth=this.JobPostingForm.value.expmonth;
    }
    localStorage.setItem("JobsPosted", JSON.stringify(JobData));
    alert("Your Job has been "+this.FormType+"ed successfully.");
    this.routeToJobDashboard();
  }
  routeToJobDashboard() {
    this.JobPostingForm.reset();
    this.router.navigateByUrl('/Job-Dashboard', { state: { id:1 , name:this.DashboardType} });
  }
  resetForm(){
    this.errorMsg = "";
    this.router.navigateByUrl('/Job-Dashboard', { state: { id:1 , name:this.DashboardType} });
  }

}
