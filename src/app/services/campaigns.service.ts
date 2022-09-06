import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Campaign } from '../interfaces/Campaign';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  private currentCampaign: Campaign;

  // baseURL: string = "http://localhost:3000/";
  // private REST_API_SERVER = "http://localhost:3000";
  private REST_API_SERVER = "https://xue2n1beqj.execute-api.ap-southeast-1.amazonaws.com/nussmp";

  constructor(private httpClient: HttpClient) { }

  public getCampaigns(): Observable<Campaign[]> {
    const url = `${this.REST_API_SERVER}/campaigns`;
    return this.httpClient.get<Campaign[]>(url,httpOptions);
  }
  public getCampaign(CAMPAIGNS_ID: string): Observable<Campaign> {
    const url = `${this.REST_API_SERVER}/campaign?CAMPAIGNS_ID=${CAMPAIGNS_ID}`;
    return this.httpClient.get<Campaign>(url,httpOptions);
  }

  public deleteCampaign(campaign: Campaign): Observable<Campaign> {
    const url = `${this.REST_API_SERVER}/campaign?EMAIL=${campaign.CAMPAIGNS_ID}`;
    return this.httpClient.delete<Campaign>(url,httpOptions);
  }
  public updateCampaign(campaign: Campaign): Observable<Campaign> {
    const url = `${this.REST_API_SERVER}/campaign`;
    return this.httpClient.put<Campaign>(url, campaign, httpOptions);
  }
  public addCampaign(campaign: Campaign): Observable<Campaign> {
    const url = `${this.REST_API_SERVER}/campaign`;
    return this.httpClient.post<Campaign>(url, campaign, httpOptions);
  }

  public setCurrentCampaign(campaign: Campaign) {
    this.currentCampaign = campaign;
    let a = JSON.stringify(campaign);
    localStorage.setItem('campaign', a);
    
  }

  public getCurrentCampaign() {
    return this.currentCampaign;
  }

}