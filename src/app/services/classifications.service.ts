import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classification } from '../interfaces/Classification';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class ClassificationsService {

  private REST_API_SERVER = "https://yklqvqw0oa.execute-api.ap-southeast-1.amazonaws.com/prod";

  constructor(private httpClient: HttpClient) { }

  public getCategories(): Observable<Classification[]> {
    const url = `${this.REST_API_SERVER}/classifications?TYPES=CATEGORY`;
    return this.httpClient.get<Classification[]>(url,httpOptions);
  }
  public getTags(PARENT: string): Observable<Classification[]> {
    const url = `${this.REST_API_SERVER}/classifications?TYPES=TAGS&PARENT=${PARENT}`;
    return this.httpClient.get<Classification[]>(url,httpOptions);
  }
}
