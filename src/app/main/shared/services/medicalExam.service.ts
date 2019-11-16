import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable()
export class MedicalExamService {
  constructor(
    public http: HttpClient
  ) {}

  public getMedicalExamination(id): Observable<any> {
    return this.http.get(`backend/api/${environment.api.medicalExamination.url}/${id}`);
  }

  public addMedicalExamination(data): Observable<any> {
    return this.http.post(`backend/api/${environment.api.medicalExamination.url}`, data,
      {responseType: 'json'});
  }

  public deleteMedicalExamination(id): Observable<any> {
    return this.http.delete<HttpResponse<any>>
    (`backend/api/${environment.api.medicalExamination.url}/${id}`);
  }
}
