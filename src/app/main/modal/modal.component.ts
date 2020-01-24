import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from "../shared/services/modal.service";
import {PatientService} from "../shared/services/patient.service";
import {Router} from "@angular/router";
import {MedicalExamService} from "../shared/services/medicalExam.service";
import {InjuriesService} from "../shared/services/injuries.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() patientId: number;
  @Input() modalType: string;
  @Output() OnMedExamAdd = new EventEmitter();
  @Output() OnMedExamDeleted = new EventEmitter();

  @Output() OnIllnessAdded = new EventEmitter();
  @Output() OnIllnessDeleted = new EventEmitter();

  public showTip: string;

  constructor(
    public modalService: ModalService,
    private patientService: PatientService,
    private router: Router,
    private medicalExamService: MedicalExamService,
    private injuriesService: InjuriesService
  ) {

  }


  public deletePatient() {
    this.patientService.deletePatientById(this.patientId).subscribe((data) => {
    });
    this.closeModal();
    setTimeout(() => {
      window.location.reload();
    }, 1500);
    this.router.navigate(['/main/empty']);
  }

  public closeModal() {
    this.modalService.modalType = null;
    this.modalType = null;
  }

  public deleteMedExam() {
    this.medicalExamService.deleteMedicalExamination(this.modalService.medicalExamId).subscribe(data => {
      this.closeModal();
      this.medExamDeleted('deleted');
    });
  }

  public deleteIllness() {
    this.injuriesService.deleteInjuries(this.modalService.illnessId).subscribe(data => {
      this.closeModal();
      this.illnessDeleted('deleted');
    });

  }

  public newMedExamAdded(event) {
    this.OnMedExamAdd.emit(event);
  }

  public newIllnessAdded(event) {
    this.OnIllnessAdded.emit(event);
  }

  private medExamDeleted(event) {
    this.OnMedExamDeleted.emit(event);
  }

  private illnessDeleted(event) {
    this.OnIllnessDeleted.emit(event);
  }

  ngOnInit() {
  }

}
