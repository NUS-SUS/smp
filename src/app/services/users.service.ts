import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User, UserModel } from '../interfaces/User';
import { Auth } from 'aws-amplify';
import { from } from 'rxjs';
import { switchMap,catchError } from 'rxjs/operators';
import { Influencer, InfluencerModel } from '../interfaces/Influencer';
import { Company, CompanyModel } from '../interfaces/Company';
import { InfluencersService } from './influencers.service';
import { CompaniesService } from './companies.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private currentUser: User;

  constructor(
    private influencersService: InfluencersService,
    private companiesService: CompaniesService) {
  }

  public getUser(email: string): Observable<UserModel> {
    return this.influencersService.getInfluencer(email).pipe(
        switchMap((influencer:Influencer)=>{
          return of(this.convertToUserModel(influencer)); 
        }),
        catchError(() => this.companiesService.getCompany(email))
    );
  }

  public deleteUser(user: UserModel): Observable<UserModel> {
    if(user.USER_TYPE === 'Influencer'){
      return this.influencersService.deleteInfluencer(user).pipe(switchMap((input:any)=>{
        return of(this.convertToUserModel(input));
      }));
    }else if(user.USER_TYPE === 'Company'){
      return this.companiesService.deleteCompany(user).pipe(switchMap((input:any)=>{
        return of(this.convertToUserModel(input));
      }));
    }else{
      return of(null);
    }
  }
  public updateUser(user: UserModel): Observable<UserModel> {
    // const url = `${this.REST_API_SERVER}/${user.EMAIL}`;
    // return this.httpClient.put<User>(url, user, httpOptions);
    if(user.USER_TYPE === 'Influencer'){
      return this.influencersService.updateInfluencer(user).pipe(switchMap((input:any)=>{
        return of(this.convertToUserModel(input));
      }));
    }else if(user.USER_TYPE === 'Company'){
      return this.companiesService.updateCompany(user).pipe(switchMap((input:any)=>{
        return of(this.convertToUserModel(input));
      }));
    }else{
      return of(null);
    }
  }
  public addUser(user: UserModel): Observable<UserModel> {
    if(user.USER_TYPE === 'Influencer'){
      return this.influencersService.addInfluencer(user).pipe(switchMap((input:any)=>{
        return of(this.convertToUserModel(input));
      }));
    }else if(user.USER_TYPE === 'Company'){
      return this.companiesService.addCompany(user).pipe(switchMap((input:any)=>{
        return of(this.convertToUserModel(input));
      }));
    }else{
      return of(null);
    }
  }


  private getCurrentUserPromise = async () => {
    if (this.currentUser) {
      return this.currentUser;
    } else {
      const user = await Auth.currentAuthenticatedUser();
      const { attributes } = user;
      this.currentUser = new UserModel(attributes.email);
      return this.currentUser;
    }
  };
  public getCurrentUser(): Observable<UserModel> {
    return from(this.getCurrentUserPromise.apply(null)).pipe(
      switchMap((user: User) => {
        return this.getUser(user.EMAIL);
      })
    )
  };
  
  public getNewUserFromUserPool(): Observable<User> {
    return from(this.getCurrentUserPromise.apply(null));
  };

  public convertToUserModel(input:any): UserModel{
   let user = new UserModel("");
    if(input.USER_TYPE ==="Influencer"){
      user = {...input};
    }else if(input.USER_TYPE ==="Company"){
      user = {...input};
    }
    return user;
  }

}
