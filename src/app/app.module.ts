import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AuthorizationService } from './services/authorization.service';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ServicePortalService } from './services/service-portal.service';
import { JobPostedComponent } from './job-posted/job-posted.component';
import { CustomPipe } from './custom.pipe';
import { CreateJobComponent } from './job-posted/create-job/create-job.component';
import { JobApplicationComponent } from './job-posted/job-application/job-application.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    EditProfileComponent,
    JobPostedComponent,
    CustomPipe,
    CreateJobComponent,
    JobApplicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    AuthorizationService,
    AuthGuard,
    ServicePortalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
