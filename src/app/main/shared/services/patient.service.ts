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

  public deletePatientById(id): Observable<any> {
    return this.http.delete<HttpResponse<any>>
    (`backend/api/${environment.api.patient.url}/${id}`);
  }

  public getGeneralInfo(patientId): Observable<any> {
    return this.http.get<HttpResponse<any>>
    (`backend/api/${environment.api.generalInfo.url}/${patientId}`);
  }

  public getFluorograpthy(generalInfoId): Observable<any> {
    return this.http.get<HttpResponse<any>>
    (`backend/api/${environment.api.fluorography.url}/${generalInfoId}`);
  }
  public getVaccination(generalInfoId): Observable<any> {
    return this.http.get<HttpResponse<any>>
    (`backend/api/${environment.api.vaccinationstatus.url}/${generalInfoId}`);
  }
  public getSurgery(generalInfoId): Observable<any> {
    return this.http.get<HttpResponse<any>>
    (`backend/api/${environment.api.surgicalintervention.url}/${generalInfoId}`);
  }

  public editPatientById(patient): Observable<any> {
    return this.http.put(`backend/api/${environment.api.patient.url}`, patient);
  }

  public editGeneralInfo(info): Observable<any> {
    return this.http.put(`backend/api/${environment.api.generalInfo.url}`, info);
  }

  public addFluorograpty(data): Observable<any> {
    return this.http.post(`backend/api/${environment.api.fluorography.url}`, data);
  }
  public addVaccination(data): Observable<any> {
    return this.http.post(`backend/api/${environment.api.vaccinationstatus.url}`, data);
  }
  public addSurgery(data): Observable<any> {
    return this.http.post(`backend/api/${environment.api.surgicalintervention.url}`, data);
  }
  public deleteFluorograpty(id): Observable<any> {
    return this.http.delete(`backend/api/${environment.api.fluorography.url}/${id}`);
  }
  public deleteVaccination(id): Observable<any> {
    return this.http.delete(`backend/api/${environment.api.vaccinationstatus.url}/${id}`);
  }
  public deleteSurgery(id): Observable<any> {
    return this.http.delete(`backend/api/${environment.api.surgicalintervention.url}/${id}`);
  }
}
