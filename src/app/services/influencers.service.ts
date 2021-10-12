import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Influencer } from '../interfaces/Influencer';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}


@Injectable({
  providedIn: 'root'
})
export class InfluencersService {

  //private REST_API_SERVER = "http://localhost:3000/users";
  // private REST_API_SERVER = "http://localhost:5000/Influencers";
  private REST_API_SERVER = "https://sjfrf4muob.execute-api.ap-southeast-1.amazonaws.com/prod";

  constructor(private httpClient: HttpClient) {
    // this.getCurrentUserPromise.apply(null);
  }

  // public getInfluencers(): Observable<Influencer[]> {
  //   return this.httpClient.get<Influencer[]>(this.REST_API_SERVER);
  // }

  // public getInfluencer(email: string): Observable<Influencer> {
  //   const url = `${this.REST_API_SERVER}/${email}`;
  //   return this.httpClient.get<Influencer>(url);
  // }

  // public deleteInfluencer(influencer: Influencer): Observable<Influencer> {
  //   const url = `${this.REST_API_SERVER}/${influencer.EMAIL}`;
  //   return this.httpClient.delete<Influencer>(url);
  // }
  // public updateInfluencer(influencer: Influencer): Observable<Influencer> {
  //   const url = `${this.REST_API_SERVER}/${influencer.EMAIL}`;
  //   return this.httpClient.put<Influencer>(url, influencer, httpOptions);
  // }
  // public addInfluencer(influencer: Influencer): Observable<Influencer> {
  //   return this.httpClient.post<Influencer>(this.REST_API_SERVER, influencer, httpOptions);
  // }
  public getInfluencers(): Observable<Influencer[]> {
    const url = `${this.REST_API_SERVER}/influencers`;
    return this.httpClient.get<Influencer[]>(this.REST_API_SERVER);
  }

  public getInfluencer(email: string): Observable<Influencer> {
    const url = `${this.REST_API_SERVER}/influencer?EMAIL=${email}`;
    return this.httpClient.get<Influencer>(url,httpOptions);
  }

  public deleteInfluencer(influencer: Influencer): Observable<Influencer> {
    const url = `${this.REST_API_SERVER}/influencer?EMAIL=${influencer.EMAIL}`;
    return this.httpClient.delete<Influencer>(url,httpOptions);
  }
  public updateInfluencer(influencer: Influencer): Observable<Influencer> {
    const url = `${this.REST_API_SERVER}/influencer`;
    return this.httpClient.put<Influencer>(url, influencer, httpOptions);
  }
  public addInfluencer(influencer: Influencer): Observable<Influencer> {
    const url = `${this.REST_API_SERVER}/influencer`;
    return this.httpClient.post<Influencer>(url, influencer, httpOptions);
  }   

  
    

}
