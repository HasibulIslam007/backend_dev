export declare const PaymentService: {
    initPayment: (bookingId: string) => Promise<{
        paymentUrl: any;
    }>;
    successPayment: (transactionId: string, gatewayData?: unknown) => Promise<{
        success: boolean;
        message: string;
        transactionId: string;
    }>;
    failPayment: (transactionId: string, gatewayData?: unknown) => Promise<{
        success: boolean;
        message: string;
        transactionId: string;
    }>;
    cancelPayment: (transactionId: string, gatewayData?: unknown) => Promise<{
        success: boolean;
        message: string;
        transactionId: string;
    }>;
    validatePayment: (payload: unknown) => Promise<{
        success: boolean;
    }>;
};
//# sourceMappingURL=payment.service.d.ts.map