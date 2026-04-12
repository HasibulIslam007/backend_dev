import type { Types } from "mongoose";
export declare enum PAYMENT_STATUS {
    PAID = "PAID",
    UNPAID = "UNPAID",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED",
    CANCELLED = "CANCELLED"
}
export interface IPayment {
    booking: Types.ObjectId;
    transactionId: string;
    amount: number;
    paymentGatewayData?: any;
    invoiceUrl?: string;
    status: PAYMENT_STATUS;
}
//# sourceMappingURL=payment.interface.d.ts.map