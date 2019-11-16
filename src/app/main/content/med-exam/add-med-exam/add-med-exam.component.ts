import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ModalService} from "../../../shared/services/modal.service";
import {HttpClient} from "@angular/common/http";
import {MedicalExamService} from "../../../shared/services/medicalExam.service";

@Component({
  selector: 'app-add-med-exam',
  templateUrl: './add-med-exam.component.html',
  styleUrls: ['./add-med-exam.component.scss']
})
export class AddMedExamComponent implements OnInit {
  @Output() OnMedExamAdd = new EventEmitter();
  @Input() patientId: number;

  public isBodycheckAdded;
  public isLoaded;

  private selectedFilesBak;
  private selectedFilesOak;
  private selectedFilesOam;
  private selectedFilesEkg;
  private selectedFilesUzi;
  private imageSrcBak;
  private imageSrcOak;
  private imageSrcOam;
  private imageSrcEkg;
  private imageSrcUzi;

  form = this.fb.group({
    procedureTime: ['', Validators.required],
    medAllow: '',
    oculist: '',
    neurologist: '',
    otolaryngologist: '',
    surgeon: '',
    dentist: '',
    endocrinologist: '',
    sportsDoctor: ''
  });


  @ViewChild('bak') bak: any;
  @ViewChild('oak') oak: any;
  @ViewChild('oam') oam: any;
  @ViewChild('ekg') ekg: any;
  @ViewChild('uzi') uzi: any;


  constructor(private modalService: ModalService,
              private fb: FormBuilder,
              public http: HttpClient,
              private medicalExamService: MedicalExamService) {
  }

  ngOnInit() {
    this.isLoaded = true;
  }

  onFileChangeBak(event) {
    let nativeElement: HTMLInputElement = this.bak.nativeElement;

    this.selectedFilesBak = nativeElement.files;

    if (event.target.files && event.target.files[0]) {
      const percentDone = Math.round(100 * event.loaded / event.total);

      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrcBak = reader.result;

      reader.readAsDataURL(file);
    }
  }

  onFileChangeOak(event) {
    let nativeElement: HTMLInputElement = this.oak.nativeElement;

    this.selectedFilesOak = nativeElement.files;

    if (event.target.files && event.target.files[0]) {

      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrcOak = reader.result;

      reader.readAsDataURL(file);
    }
  }

  onFileChangeOam(event) {
    let nativeElement: HTMLInputElement = this.oam.nativeElement;

    this.selectedFilesOam = nativeElement.files;

    if (event.target.files && event.target.files[0]) {

      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrcOam = reader.result;

      reader.readAsDataURL(file);
    }
  }

  onFileChangeEkg(event) {
    let nativeElement: HTMLInputElement = this.ekg.nativeElement;

    this.selectedFilesEkg = nativeElement.files;

    if (event.target.files && event.target.files[0]) {


      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrcEkg = reader.result;

      reader.readAsDataURL(file);
    }
  }

  onFileChangeUzi(event) {
    let nativeElement: HTMLInputElement = this.uzi.nativeElement;

    this.selectedFilesUzi = nativeElement.files;

    if (event.target.files && event.target.files[0]) {

      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrcUzi = reader.result;

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    let doctordiagnosis = [];
    if (!this.form.value.oculist) {
      doctordiagnosis.push({
        doctorName: 'Окулист',
        diagnosis: "Нет информации",
        id: +Date.now().toString().split('').slice(6).join('')
      });
    } else {
      doctordiagnosis.push({
        doctorName: 'Окулист',
        diagnosis: this.form.value.oculist,
        id: +Date.now().toString().split('').slice(6).join('')
      });
    }

    if (!this.form.value.neurologist) {
      doctordiagnosis.push({
        doctorName: 'Невролог',
        diagnosis: "Нет информации",
        id: +Date.now().toString().split('').slice(6).join('')
      });
    } else {
      doctordiagnosis.push({
        doctorName: 'Невролог',
        diagnosis: this.form.value.neurologist,
        id: +Date.now().toString().split('').slice(6).join('')+1
      });
    }
    if (!this.form.value.otolaryngologist) {
      doctordiagnosis.push({
        doctorName: 'ЛОР',
        diagnosis: "Нет информации",
        id: +Date.now().toString().split('').slice(6).join('')
      });
    } else {
      doctordiagnosis.push({
        doctorName: 'ЛОР',
        diagnosis: this.form.value.otolaryngologist,
        id: +Date.now().toString().split('').slice(6).join('')+2
      });
    }
    if (!this.form.value.surgeon) {
      doctordiagnosis.push({
        doctorName: 'Хирург',
        diagnosis: "Нет информации",
        id: +Date.now().toString().split('').slice(6).join('')
      });
    } else {
      doctordiagnosis.push({
        doctorName: 'Хирург',
        diagnosis: this.form.value.surgeon,
        id: +Date.now().toString().split('').slice(6).join('')+3
      });
    }
    if (!this.form.value.dentist) {
      doctordiagnosis.push({
        doctorName: 'Стоматолог',
        diagnosis: "Нет информации",
        id: +Date.now().toString().split('').slice(6).join('')
      });
    } else {
      doctordiagnosis.push({
        doctorName: 'Стоматолог',
        diagnosis: this.form.value.dentist,
        id: +Date.now().toString().split('').slice(6).join('')+4
      });
    }
    if (!this.form.value.endocrinologist) {
      doctordiagnosis.push({
        doctorName: 'Эндокринолог',
        diagnosis: "Нет информации",
        id: +Date.now().toString().split('').slice(6).join('')
      });
    } else {
      doctordiagnosis.push({
        doctorName: 'Эндокринолог',
        diagnosis: this.form.value.endocrinologist,
        id: +Date.now().toString().split('').slice(6).join('')+5
      });
    }
    if (!this.form.value.sportsDoctor) {
      doctordiagnosis.push({
        doctorName: 'Спортивный доктор',
        diagnosis: "Нет информации",
        id: +Date.now().toString().split('').slice(6).join('')
      });
    } else {
      doctordiagnosis.push({
        doctorName: 'Спортивный доктор',
        diagnosis: this.form.value.sportsDoctor,
        id: +Date.now().toString().split('').slice(6).join('')+6
      });
    }

    let input = new FormData();
    let data = {
      patientId: this.patientId,
      allowance: +this.form.value.medAllow,
      date: this.form.value.procedureTime,
      doctordiagnosis: doctordiagnosis
    };
    input.append('patientId', data.patientId.toString());
    input.append('allowance', data.allowance.toString());
    input.append('date', data.date.toString());
    input.append('doctordiagnosis', JSON.stringify(data.doctordiagnosis));


    if (this.selectedFilesBak !== undefined) {
      input.append('bloodchemistryanalysis', this.selectedFilesBak[0]);
    }
    if (this.selectedFilesEkg !== undefined) {
      input.append('electrocardiogram', this.selectedFilesEkg[0]);
    }
    if (this.selectedFilesOak !== undefined) {
      input.append('generalbloodanalysis', this.selectedFilesOak[0]);
    }
    if (this.selectedFilesOam !== undefined) {
      input.append('generalurineanalysis', this.selectedFilesOam[0]);
    }
    if (this.selectedFilesUzi !== undefined) {
      input.append('heartultrasound', this.selectedFilesUzi[0]);
    }



    this.medicalExamService.addMedicalExamination(input).subscribe(data => {
      this.form.reset();
      this.modalService.modalType = null;
      this.OnMedExamAdd.emit('added');
      // window.location.reload();
    });
  }


}
