import {Component, OnInit} from '@angular/core';
import {PatientService} from "../../shared/services/patient.service";
import {ActivatedRoute, Params} from "@angular/router";
import {IMedicalExams} from "../../../shared/interfaces/medicalExam";
import {MedicalExamService} from "../../shared/services/medicalExam.service";
import {ModalService} from "../../shared/services/modal.service";

@Component({
  selector: 'app-med-exam',
  templateUrl: './med-exam.component.html',
  styleUrls: ['./med-exam.component.scss']
})
export class MedExamComponent implements OnInit {
  public patientId: any;
  public medicalExams: IMedicalExams;
  public medicalExamId: number;


  constructor(private route: ActivatedRoute,
              private medicalExamService: MedicalExamService,
              public modalService: ModalService) {
  }

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      this.patientId = params['id'];
    });
    this.medicalExamService.getMedicalExamination(this.patientId).subscribe(data => {
      this.medicalExams = data;
      this.medicalExamId = data.id;
    })
  }

  public newMedExamAdded(event) {
    this.medicalExamService.getMedicalExamination(this.patientId).subscribe(data => {
      this.medicalExams = data;
      this.medicalExamId = data.id;
    })
  }
  public newMedExamDeleted(event) {
    this.medicalExamService.getMedicalExamination(this.patientId).subscribe(data => {
      this.medicalExams = data;
      this.medicalExamId = data.id;
    })
  }

}
