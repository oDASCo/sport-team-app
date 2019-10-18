import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalService} from "../../../shared/services/modal.service";
import {PatientService} from "../../../shared/services/patient.service";

@Component({
  selector: 'app-edit-main-info',
  templateUrl: './edit-main-info.component.html',
  styleUrls: ['./edit-main-info.component.scss']
})
export class EditMainInfoComponent implements OnInit {
  playerId;
  selectedFile;
  imageSrc;

  firstName;
  lastName;
  photo;

  form = this.fb.group({
    firstName: '',
    lastName: '',
    img: ['', Validators.required]
  });

  isPlayerEdited = false;
  isLoaded = true;

  @ViewChild('editFileInput') editFileInput: any;

  constructor(private patientService: PatientService,
              private modalService: ModalService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      newFirstName: new FormControl(),
      newLastName: new FormControl(),
      photo: new FormControl()
    });
    this.playerId = this.modalService.patientId;

    this.patientService.getPatientById(this.playerId).subscribe((data) => {
      console.log(data);
      const name = data.name.split(' ');
      this.firstName = name[0];
      this.lastName = name[1];
      this.photo = data.photo;
    });

    this.form.patchValue({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  addLoader() {
    this.isLoaded = false;
  }

  onFileChange(event) {
    let nativeElement: HTMLInputElement = this.editFileInput.nativeElement;

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

    const {newFirstName, newLastName} = this.form.value;
    let input = new FormData();

    if (this.selectedFile == undefined) {
      input.append("file", null);
    } else {
      input.append("file", this.selectedFile[0]);
    }


    if (newFirstName === null && newLastName === null) {
      input.append("name", this.firstName + ' ' + this.lastName);
    } else if (newFirstName === null && newLastName !== null) {
      input.append("name", this.firstName + ' ' + newLastName);
    } else if (newFirstName !== null && newLastName === null) {
      input.append("name", newFirstName + ' ' + this.lastName);
    } else {
      input.append("name", newFirstName + ' ' + newLastName);
    }


    input.append("id", this.playerId);
    input.append("photoName", this.photo);


    if (!this.form.invalid) {
      this.patientService.editPatientById(input).subscribe(() => {
        this.form.reset();
        this.isPlayerEdited = true;
        this.isLoaded = true;
        window.location.reload();
      });
    }

  }

}
