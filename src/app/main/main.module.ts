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
import {EditModeService} from "./shared/services/editMode.service";
import {ModalComponent} from './modal/modal.component';
import {ModalService} from "./shared/services/modal.service";
import { EmptyComponentComponent } from './empty-component/empty-component.component';
import {SharedModule} from "../shared/shared.module";
import { EditMainInfoComponent } from './content/info/edit-main-info/edit-main-info.component';
import {MedicalExamService} from "./shared/services/medicalExam.service";
import { AddMedExamComponent } from './content/med-exam/add-med-exam/add-med-exam.component';
import {InjuriesService} from "./shared/services/injuries.service";
import { AddIllnessComponent } from './content/illnesses/add-illness/add-illness.component';

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
    AddPatientComponent,
    ModalComponent,
    EmptyComponentComponent,
    EditMainInfoComponent,
    AddMedExamComponent,
    AddIllnessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    PatientService,
    EditModeService,
    ModalService,
    MedicalExamService,
    InjuriesService
  ]
})
export class MainModule {
}
