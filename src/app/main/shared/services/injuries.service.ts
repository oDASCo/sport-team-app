import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable()
export class InjuriesService {
  constructor(
    public http: HttpClient
  ) {}

  public getInjuries(id): Observable<any> {
    return this.http.get(`backend/api/${environment.api.injuriesDiseases.url}/${id}`);
  }

  public addInjuries(data): Observable<any> {
    return this.http.post(`backend/api/${environment.api.injuriesDiseases.url}`, data,
      {responseType: 'json'});
  }

  public deleteInjuries(id): Observable<any> {
    return this.http.delete<HttpResponse<any>>
    (`backend/api/${environment.api.injuriesDiseases.url}/${id}`);
  }
}
