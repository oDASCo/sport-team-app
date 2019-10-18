import {Component, OnInit} from '@angular/core';
import {PatientService} from "../shared/services/patient.service";
import {ActivatedRoute, Params} from "@angular/router";
import {IPatient} from "../../shared/interfaces/patient";
import {EditModeService} from "../shared/services/editMode.service";
import {ModalService} from "../shared/services/modal.service";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public patient: IPatient = {
    id: null,
    name: null,
    photo: null
  };

  constructor(private patientService: PatientService,
              private route: ActivatedRoute,
              public editModeService: EditModeService,
              public modalService: ModalService) {
  }

  ngOnInit() {
    this.getPatient();
  }

  private getPatient() {
    this.route.params.subscribe((params: Params) => {
      this.patient.id = params['id'];
      this.patientService.getPatientById(this.patient.id).subscribe((data) => {
        this.patient.name = data.name;
        this.patient.photo = data.photo;
      });
    });
  }

}
