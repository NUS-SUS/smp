import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { User, UserModel } from '../interfaces/User';
import { Auth } from 'aws-amplify';
import { switchMap,catchError } from 'rxjs/operators';
import { Influencer } from '../interfaces/Influencer';
import { InfluencersService } from './influencers.service';
import { CompaniesService } from './companies.service';
import { AuthenticatorService } from '@aws-amplify/ui-angular';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private currentUser: User;
  private token: any;

  constructor(
    private influencersService: InfluencersService,
    private companiesService: CompaniesService,
    public authenticator: AuthenticatorService) {
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
      const user = await Auth.currentAuthenticatedUser();
      const { attributes } = user;
      this.currentUser = new UserModel(attributes.email);
      this.token = user.signInUserSession.idToken.jwtToken;
      return this.currentUser;
  };
  public getCurrentUser(): Observable<UserModel> {
    return from(this.getCurrentUserPromise.apply(null)).pipe(
      switchMap((user: User) => {
        return this.getUser(user.EMAIL);
      })
    )
  }
  
  public getNewUserFromUserPool(): Observable<User> {
    return from(this.getCurrentUserPromise.apply(null));
  }

  public convertToUserModel(input:any): UserModel{
   let user = new UserModel("");
    if(input.USER_TYPE ==="Influencer" || input.USER_TYPE ==="Company"){
      user = {...input};
    }
    return user;
  }

  public getUserToken() {
    return this.token;
  }

  public userLoggedOut() {
    this.authenticator.signOut();
  }

}
