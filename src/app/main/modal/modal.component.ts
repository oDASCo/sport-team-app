import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from "../shared/services/modal.service";
import {PatientService} from "../shared/services/patient.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() playerId: string;
  @Input() modalType: string;
  public showTip: string;

  constructor(
    public modalService: ModalService,
    private patientService: PatientService,
    private router: Router
  ) {

  }


  public deletePatient() {
    this.patientService.deletePatientById(this.playerId).subscribe((data) => {});
    this.closeModal();
    this.router.navigate(['/main/empty']);
  }

  public closeModal() {
    this.modalService.modalType = null;
    this.modalType = null;
  }

  ngOnInit() {
  }

}
