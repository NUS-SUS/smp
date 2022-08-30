import { User } from "./User";

export interface Company extends User {    
    EMAIL?: string;  
    BLOCK_NUMBER?: string;
    CONTACT_NUMBER?: string;
    NATIONALITY?: string;
    POSTAL_CODE?: string;
    STREET_NAME?: string;
    UNIT_NUMBER?: string;
    VERIFIED?: boolean;

    CAMPAIGN_FUNDS?: number;
    COMPANY_NAME?: string;
    USER_TYPE?: string;

}
export class CompanyModel implements Company{
    EMAIL?: string;  
    BLOCK_NUMBER?: string;
    CONTACT_NUMBER?: string;
    NATIONALITY?: string;
    POSTAL_CODE?: string;
    STREET_NAME?: string;
    UNIT_NUMBER?: string;
    VERIFIED?: boolean;

    CAMPAIGN_FUNDS?: number;
    COMPANY_NAME?: string;
    USER_TYPE?: string;
    constructor(EMAIL: string) {
        this.EMAIL = EMAIL;
    }
}