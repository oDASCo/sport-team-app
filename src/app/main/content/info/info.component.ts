import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EditModeService} from "../../shared/services/editMode.service";
import {ModalService} from "../../shared/services/modal.service";
import {PatientService} from "../../shared/services/patient.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  public playerId;
  public playerGeneralInfo;
  public playerGeneralInfoId;
  public form: FormGroup;
  public flurographiesList;
  public vaccinationsList;
  public surgeriesList;
  public flurographyForm: FormGroup;
  public vaccinationForm: FormGroup;
  public surgeryForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    public editModeService: EditModeService,
    public modalService: ModalService,
    private patientService: PatientService
  ) {
  }

  ngOnInit() {
    this.formGroup();
    this.route.parent.params.subscribe((params: Params) => {
      this.playerId = params['id'];
    });
    this.patientService.getGeneralInfo(this.playerId).subscribe(data => {
      this.playerGeneralInfo =
        {
          id: data.id,
          patientId: data.patientId,
          birthday: data.birthday,
          weight: data.weight,
          height: data.height,
          arterialPressure: data.arterialPressure,
          bloodType: data.bloodType
        };
      this.playerGeneralInfoId = this.playerGeneralInfo.id;
      this.form.patchValue({
        date: data.birthday,
        weight: data.weight,
        height: data.height,
        arterialPressure: data.arterialPressure,
        bloodType: data.bloodType
      });
      this.patientService.getFluorograpthy(this.playerGeneralInfoId).subscribe(data => {
        this.flurographiesList = data;
        console.log(data);
      });
      this.patientService.getVaccination(this.playerGeneralInfoId).subscribe(data => {
        this.vaccinationsList = data;
        console.log(data);
      });
      this.patientService.getSurgery(this.playerGeneralInfoId).subscribe(data => {
        this.surgeriesList = data;
        console.log(data);
      });
    });


  }

  private formGroup() {
    this.form = new FormGroup({
      date: new FormControl(),
      weight: new FormControl(),
      height: new FormControl(),
      arterialPressure: new FormControl(),
      bloodType: new FormControl()
    });
    this.flurographyForm = new FormGroup({
      flurographyDate: new FormControl(null, [Validators.required]),
      flurographyInfo: new FormControl(null, [Validators.required])
    });
    this.vaccinationForm = new FormGroup({
      vaccinationDate: new FormControl(null, [Validators.required]),
      vaccinationInfo: new FormControl(null, [Validators.required])
    });
    this.surgeryForm = new FormGroup({
      surgeryDate: new FormControl(null, [Validators.required]),
      surgeryInfo: new FormControl(null, [Validators.required]),
      surgeryDiagnosis: new FormControl(null, [Validators.required])
    });
  }

  public onEditMode() {
    this.editModeService.onEditMode();
  }

  public offEditMode() {
    this.editModeService.offEditMode();
  }

  deleteFlurography(event) {

  }

  deleteVaccination(event) {

  }

  deleteSurgery(event) {

  }

  onSubmit() {

  }

  onFlurographySubmit() {


  }

  onVaccinationSubmit() {

  }


  onSurgerySubmit() {
  }


}
