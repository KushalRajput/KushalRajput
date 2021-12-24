import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { HomeComponent } from './home/home.component';
import { CreateJobComponent } from './job-posted/create-job/create-job.component';
import { JobApplicationComponent } from './job-posted/job-application/job-application.component';
import { JobPostedComponent } from './job-posted/job-posted.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  {path:"Home",component:HomeComponent,canActivate:[AuthGuard]},
  {path:"Login",component:LoginComponent},
  {path:"Register",component:RegisterComponent},
  {path:"Dashboard",component:DashboardComponent,canActivate:[AuthGuard]},
  {path:"EditProfile",component:EditProfileComponent,canActivate:[AuthGuard]},
  {path:"Job-Dashboard",component:JobPostedComponent,canActivate:[AuthGuard]},
  {path:"Manage-Job",component:CreateJobComponent,canActivate:[AuthGuard]},
  {path:"AppliedOnJob",component:JobApplicationComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
