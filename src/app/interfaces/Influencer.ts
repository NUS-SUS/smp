import { User } from "./User";

export interface Influencer extends User {    
    EMAIL?: string;  
    BLOCK_NUMBER?: string;
    CONTACT_NUMBER?: string;
    NATIONALITY?: string;
    POSTAL_CODE?: string;
    STREET_NAME?: string;
    UNIT_NUMBER?: string;
    VERIFIED?: boolean;

    FULL_NAME?: string;
    GENDER?: string;
    BIRTHDATE?: string;
    LANGUAGE?: string[];
    CATEGORY?: string;
    TAGS?: string[];
    PROFILE_PHOTO?: string;
    SOCIAL_MEDIA?: string[];
    USER_TYPE?: string;
}
export class InfluencerModel implements Influencer{
    EMAIL?: string;  
    BLOCK_NUMBER?: string;
    CONTACT_NUMBER?: string;
    NATIONALITY?: string;
    POSTAL_CODE?: string;
    STREET_NAME?: string;
    UNIT_NUMBER?: string;
    VERIFIED?: boolean;

    FULL_NAME?: string;
    GENDER?: string;
    BIRTHDATE?: string;
    LANGUAGE?: string[];
    CATEGORY?: string;
    TAGS?: string[];
    PROFILE_PHOTO?: string;
    SOCIAL_MEDIA?: string[];
    USER_TYPE?: string;
    constructor(EMAIL: string) {
        this.EMAIL = EMAIL;
    }
}