import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ModalService} from "../../shared/services/modal.service";
import {InjuriesService} from "../../shared/services/injuries.service";

@Component({
  selector: 'app-illnesses',
  templateUrl: './illnesses.component.html',
  styleUrls: ['./illnesses.component.scss']
})
export class IllnessesComponent implements OnInit {
  public patientId;
  public illnessesList;
  public illnessId;


  constructor(public modalService: ModalService,
              private route: ActivatedRoute,
              private injuriesService: InjuriesService) {
  }

  public getIllnessId(event) {
    this.illnessId = event.currentTarget.id;
  }

  ngOnInit() {
    this.route.parent.params.subscribe((params: Params) => {
      this.patientId = params['id'];
    });

    this.injuriesService.getInjuries(this.patientId).subscribe((data) => {
      this.illnessesList = data;
    });
  }

  public newIllnessAdded(event) {
    this.injuriesService.getInjuries(this.patientId).subscribe((data) => {
      this.illnessesList = data;
    });
  }

  public illnessDeleted(event) {
    this.injuriesService.getInjuries(this.patientId).subscribe((data) => {
      this.illnessesList = data;
    });
  }


}
