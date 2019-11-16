import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ModalService} from "../../../shared/services/modal.service";
import {InjuriesService} from "../../../shared/services/injuries.service";

@Component({
  selector: 'app-add-illness',
  templateUrl: './add-illness.component.html',
  styleUrls: ['./add-illness.component.scss']
})
export class AddIllnessComponent implements OnInit {

  @Input() patientId: number;
  @Output() OnIllnessAdded = new EventEmitter();

  public selectedFilesMrt;
  public selectedFilesUzi;
  public selectedFilesRentgen;
  public imageSrcMrt;
  public imageSrcUzi;
  public imageSrcRentgen;

  public isIllnessesAdded = false;

  form = this.fb.group({
    illnessStartDate: ['', Validators.required],
    illnessEndDate: ['', Validators.required],
    diagnosis: '',
    drugTherapy: '',
    physiotherapyTreatment: '',
    other: ''
  });

  @ViewChild('mrt') bak: any;
  @ViewChild('uzi') oak: any;
  @ViewChild('rentgen') oam: any;


  constructor(private modalService: ModalService,
              private injuriesService: InjuriesService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
  }


  onFileChangeMrt(event) {
    let nativeElement: HTMLInputElement = this.bak.nativeElement;
    this.selectedFilesMrt = nativeElement.files;

    if (event.target.files && event.target.files[0]) {
      const percentDone = Math.round(100 * event.loaded / event.total);

      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrcMrt = reader.result;

      reader.readAsDataURL(file);
    }
  }

  onFileChangeUzi(event) {
    let nativeElement: HTMLInputElement = this.oak.nativeElement;
    this.selectedFilesUzi = nativeElement.files;

    if (event.target.files && event.target.files[0]) {

      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrcUzi = reader.result;

      reader.readAsDataURL(file);
    }
  }

  onFileChangeRentgen(event) {
    let nativeElement: HTMLInputElement = this.oam.nativeElement;

    this.selectedFilesRentgen = nativeElement.files;

    if (event.target.files && event.target.files[0]) {

      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrcRentgen = reader.result;

      reader.readAsDataURL(file);
    }
  }


  onSubmit() {
    let input = new FormData();
    let data = {
      patientId: this.patientId,
      illnessStartDate: this.form.value.illnessStartDate,
      illnessEndDate: this.form.value.illnessEndDate,
      diagnosis: this.form.value.diagnosis,
      drugTherapy: this.form.value.physiotherapyTreatment,
      physiotherapyTreatment: this.form.value.procedureTime,
      other: this.form.value.other
    };
    console.log(data);
    input.append('patientId', data.patientId.toString());
    input.append('illnessStartDate', data.illnessStartDate.toString());
    input.append('illnessEndDate', data.illnessEndDate.toString());
    input.append('diagnosis', data.diagnosis);


    if (!data.drugTherapy) {
      input.append('drugTherapy', 'Нет информации');
    } else {
      input.append('drugTherapy', data.drugTherapy);
    }
    if (!data.physiotherapyTreatment) {
      input.append('physiotherapyTreatment', 'Нет информации');
    } else {
      input.append('physiotherapyTreatment', data.physiotherapyTreatment);
    }
    if (!data.other) {
      input.append('other', 'Нет информации');
    } else {
      input.append('other', data.other);
    }

    if (this.selectedFilesMrt !== undefined) {
      input.append('mri', this.selectedFilesMrt[0]);
    }
    if (this.selectedFilesRentgen !== undefined) {
      input.append('radiographies', this.selectedFilesRentgen[0]);
    }
    if (this.selectedFilesUzi !== undefined) {
      input.append('commonultrasound', this.selectedFilesUzi[0]);
    }


    this.injuriesService.addInjuries(input).subscribe(data => {
      this.form.reset();
      this.modalService.modalType = null;
      this.OnIllnessAdded.emit('added');
    });
  }
}
