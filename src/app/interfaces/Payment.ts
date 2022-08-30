export interface Payment {
    PAYMENTS_ID: string;
    TRANSACTION_ID: string;
    COMPANIES_ID: string;
    PAYMENT_TYPE: string;
    AMOUNT: number;
    CAMPAIGN_FUNDS_PURCHASED: number;
    PAYMENT_STATUS: string;

}
export class PaymentModel implements Payment {
    PAYMENTS_ID: string;
    TRANSACTION_ID: string;
    COMPANIES_ID: string;
    PAYMENT_TYPE: string;
    AMOUNT: number;
    CAMPAIGN_FUNDS_PURCHASED: number;
    PAYMENT_STATUS: string;
    constructor() {
    }
}