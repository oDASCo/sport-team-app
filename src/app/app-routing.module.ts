import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {ContentComponent} from "./main/content/content.component";
import {MedExamComponent} from "./main/content/med-exam/med-exam.component";
import {InfoComponent} from "./main/content/info/info.component";
import {IllnessesComponent} from "./main/content/illnesses/illnesses.component";
import {TestsComponent} from "./main/content/tests/tests.component";
import {MainComponent} from "./main/main.component";
import {AddPatientComponent} from "./main/add-patient/add-patient.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'main', component: MainComponent, children: [
      {path: 'patient/:id', component: ContentComponent, children: [
          {path: 'info', component: InfoComponent},
          {path: 'medical-examinations', component: MedExamComponent},
          {path: 'illnesses', component: IllnessesComponent},
          {path: 'tests', component: TestsComponent}
        ]},
      {path: 'add-patient', component: AddPatientComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
