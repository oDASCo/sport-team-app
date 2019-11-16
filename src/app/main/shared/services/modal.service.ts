import {Injectable} from '@angular/core';


@Injectable()
export class ModalService {

  public modalType:string = null;
  public patientId:number = null;
  public medicalExamId:number = null;
  public illnessId:number = null;
}
