import { Company } from "./Company";
import { Influencer } from "./Influencer";

export interface User{  
    EMAIL?: string;  
    BLOCK_NUMBER?: string;
    CONTACT_NUMBER?: string;
    NATIONALITY?: string;
    POSTAL_CODE?: string;
    STREET_NAME?: string;
    UNIT_NUMBER?: string;
    USER_TYPE?: string;
    VERIFIED?: boolean;
}
export class UserModel implements User,Company,Influencer{
    EMAIL?: string;
    BIRTHDATE?: string;
    BLOCK_NUMBER?: string;
    CAMPAIGN_FUNDS?: number;
    CATEGORY?: string;
    COMPANY_NAME?: string;
    CONTACT_NUMBER?: string;
    FULL_NAME?: string;
    GENDER?: string;
    LANGUAGE?: string[];
    NATIONALITY?: string;
    POSTAL_CODE?: string;
    PROFILE_PHOTO?: string;
    SOCIAL_MEDIA?: string[];
    STREET_NAME?: string;
    TAGS?: string[];
    UNIT_NUMBER?: string;
    USER_TYPE?: string;
    VERIFIED?: boolean;
    constructor(EMAIL: string) {
        this.EMAIL = EMAIL;
    }
}