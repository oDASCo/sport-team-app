import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable()
export class PatientService {
  constructor(
    public http: HttpClient
  ) {}

  public getPatients(): Observable<any> {
    return this.http.get<HttpResponse<any>>
    (`backend/api/${environment.api.patient.url}`);
  }

  public getPatientById(id): Observable<any> {
    return this.http.get<HttpResponse<any>>
    (`backend/api/${environment.api.patient.url}/${id}`);
  }

  public addPatient(patient): Observable<any> {
    return this.http.post(`backend/api/${environment.api.patient.url}`, patient,
      {responseType: 'json'});
  }
}
