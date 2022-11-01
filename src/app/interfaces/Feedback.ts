export interface Feedback{    
    FEEDBACK_ID?: string;
    MESSAGE?: string;
    ASSIGNED?: string;
    INFLUENCERS_ID?: string;
    COMPANIES_ID?: string;
    SUBMITTED_DATE?: number;
    CLOSE_DATE?: number;
}
export class FeedbackModel implements Feedback {
    FEEDBACK_ID?: string;
    MESSAGE?: string;
    ASSIGNED?: string;
    INFLUENCERS_ID?: string;
    COMPANIES_ID?: string;
    SUBMITTED_DATE?: number;
    CLOSE_DATE?: number;
    constructor(FEEDBACK_ID:string) {
        this.FEEDBACK_ID = FEEDBACK_ID;
    }
}