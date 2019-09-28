import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PatientService} from "../shared/services/patient.service";
import {Subject} from "rxjs";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {

  @ViewChild('OnPlayerAdd')
  private OnPlayerAdd: SidebarComponent;

  selectedFile;
  imageSrc;
  formGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });
  isPlayerAdded = false;
  isLoaded = true;

  @ViewChild('fileInput') fileInput: any;


  constructor(private patientService: PatientService,
              private fb: FormBuilder) {
  }

  ngOnInit() {

  }

  addLoader() {
    this.isLoaded = false;
  }

  onFileChange(event) {
    let nativeElement: HTMLInputElement = this.fileInput.nativeElement;

    this.selectedFile = nativeElement.files;

    if (event.target.files && event.target.files[0]) {
      const percentDone = Math.round(100 * event.loaded / event.total);

      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {

    const {firstName, lastName} = this.formGroup.value;
    let input = new FormData();
    if (this.selectedFile === undefined) {
      input.append("file", null);
    } else {
      input.append("file", this.selectedFile[0]);
    }
    input.append("name", firstName + ' ' + lastName);
    if (!this.formGroup.invalid) {
      this.patientService.addPatient(input).subscribe((data) => {
        this.OnPlayerAdd.addPatient(data);
        this.formGroup.reset();
        this.isPlayerAdded = true;
        this.isLoaded = true;
      });
    }
  }

}
