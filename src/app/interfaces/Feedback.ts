export interface Feedback{    
    FEEDBACKS_ID?: string;
    MESSAGE?: string;
    ASSIGNED?: string;
    INFLUENCERS_ID?: string;
    COMPANIES_ID?: string;
    SUBMITTED_DATE?: number;
    CLOSE_DATE?: number;
}
export class FeedbackModel implements Feedback {
    FEEDBACKS_ID?: string;
    MESSAGE?: string;
    ASSIGNED?: string;
    INFLUENCERS_ID?: string;
    COMPANIES_ID?: string;
    SUBMITTED_DATE?: number;
    CLOSE_DATE?: number;
    constructor(FEEDBACKS_ID:string) {
        this.FEEDBACKS_ID = FEEDBACKS_ID;
    }
}