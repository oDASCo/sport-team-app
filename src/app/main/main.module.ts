import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MainComponent} from './main.component';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {HeaderComponent} from "./header/header.component";
import {ContentComponent} from "./content/content.component";
import {MedExamComponent} from "./content/med-exam/med-exam.component";
import {TestsComponent} from "./content/tests/tests.component";
import {InfoComponent} from "./content/info/info.component";
import {IllnessesComponent} from "./content/illnesses/illnesses.component";
import {AddPatientComponent} from "./add-patient/add-patient.component";
import {AppRoutingModule} from "../app-routing.module";
import {PatientService} from "./shared/services/patient.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    HeaderComponent,
    ContentComponent,
    MedExamComponent,
    TestsComponent,
    InfoComponent,
    IllnessesComponent,
    AddPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PatientService]
})
export class MainModule {
}
