import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnquiryFormComponent } from './enquiry-form/enquiry-form.component';
import { LocationComponent } from './master/location/location.component';
import { RequirementComponent } from './master/requirement/requirement.component';
import { BudgetComponent } from './master/budget/budget.component';
import { BuilderComponent } from './master/builder/builder.component';
import { ProjectComponent } from './master/project/project.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }, {
        path: 'enquiryform',
        component: EnquiryFormComponent
    },
    { path: 'master/location', component: LocationComponent },
    { path: 'master/requirement', component: RequirementComponent },
    { path: 'master/budget', component: BudgetComponent },
    { path: 'master/builder', component: BuilderComponent },
    { path: 'master/project', component: ProjectComponent },
    {
        path:'register',
        component: RegisterComponent
    }
];
