import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EditModeService} from "../../shared/services/editMode.service";
import {ModalService} from "../../shared/services/modal.service";
import {PatientService} from "../../shared/services/patient.service";
import {subscribeOn} from "rxjs/operators";

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
      });
      this.patientService.getVaccination(this.playerGeneralInfoId).subscribe(data => {
        this.vaccinationsList = data;
      });
      this.patientService.getSurgery(this.playerGeneralInfoId).subscribe(data => {
        this.surgeriesList = data;
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

  public deleteFlurography(id) {
    let flurographiesList = new Set(this.flurographiesList);
    flurographiesList.forEach((item:any) => {
      if (item.id === id) {
        flurographiesList.delete(item)
      }
    });
    this.flurographiesList = Array.from(flurographiesList);
    this.patientService.deleteFluorograpty(id).subscribe(item => {});
  }

  public deleteVaccination(id) {
    let vaccinationsList = new Set(this.vaccinationsList);
    vaccinationsList.forEach((item:any) => {
      if (item.id === id) {
        vaccinationsList.delete(item)
      }
    });
    this.vaccinationsList = Array.from(vaccinationsList);
    this.patientService.deleteVaccination(id).subscribe(item => {});
  }

  public deleteSurgery(id) {
    let surgeriesList = new Set(this.surgeriesList);
    surgeriesList.forEach((item: any) => {
        if (item.id === id) {
          surgeriesList.delete(item)
        }

    });
    this.surgeriesList = Array.from(surgeriesList);
    this.patientService.deleteSurgery(id).subscribe(item => {});
  }

  public onSubmit() {
    let generalInfo = {
      id: this.playerGeneralInfoId,
      date: this.form.value.date,
      weight: this.form.value.weight,
      height: this.form.value.height,
      arterialPressure: this.form.value.arterialPressure,
      bloodType: this.form.value.bloodType,
      flurographiesList: this.flurographiesList,
      vaccinationsList: this.vaccinationsList,
      surgeriesList: this.surgeriesList
    };
    this.patientService.editGeneralInfo(generalInfo).subscribe(data => {
      this.offEditMode();
    });
  }

  public onFlurographySubmit() {
    let flurography = {
      procedureDate: this.flurographyForm.value.flurographyDate,
      info: this.flurographyForm.value.flurographyInfo,
      GeneralInfo_id: this.playerGeneralInfoId,
      id: +Date.now().toString().split('').slice(6).join('')
    };
    this.flurographiesList.push({
      procedureDate: this.flurographyForm.value.flurographyDate,
      info: this.flurographyForm.value.flurographyInfo,
      GeneralInfo_id: this.playerGeneralInfoId,
      id: flurography.id
    });
    this.patientService.addFluorograpty(flurography).subscribe(item => {});
    this.flurographyForm.reset();
  }

  public onVaccinationSubmit() {

    let vaccination = {
      procedureDate: this.vaccinationForm.value.vaccinationDate,
      info: this.vaccinationForm.value.vaccinationInfo,
      GeneralInfo_id: this.playerGeneralInfoId,
      id: +Date.now().toString().split('').slice(6).join('')
    };
    this.vaccinationsList.push({
      procedureDate: this.vaccinationForm.value.vaccinationDate,
      info: this.vaccinationForm.value.vaccinationInfo,
      GeneralInfo_id: this.playerGeneralInfoId,
      id: vaccination.id
    });
    this.patientService.addVaccination(vaccination).subscribe(item => {});
    this.vaccinationForm.reset();
  }


  public onSurgerySubmit() {
    let surgery = {
      procedureDate: this.surgeryForm.value.surgeryDate,
      interventionType: this.surgeryForm.value.surgeryInfo,
      diagnosis: this.surgeryForm.value.surgeryDiagnosis,
      GeneralInfo_id: this.playerGeneralInfoId,
      id: +Date.now().toString().split('').slice(6).join('')
    };
    this.surgeriesList.push({
      procedureDate: this.surgeryForm.value.surgeryDate,
      interventionType: this.surgeryForm.value.surgeryInfo,
      diagnosis: this.surgeryForm.value.surgeryDiagnosis,
      GeneralInfo_id: this.playerGeneralInfoId,
      id: surgery.id
    });
    this.patientService.addSurgery(surgery).subscribe(item => {});
    this.surgeryForm.reset();
  }
}
