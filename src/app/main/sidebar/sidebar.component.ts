import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {PatientService} from "../shared/services/patient.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public patients = [];

  constructor(
    private patientService: PatientService
  ) {
  }

  ngOnInit() {
    this.getPatients();
  }

  public getPatients() {
    this.patientService.getPatients().subscribe((data) => {
      this.patients = data;
    });
  }

  public addPatient(data) {
    this.patients.push(data);
  }
}
