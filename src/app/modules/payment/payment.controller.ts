
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from "http-status-codes";
import { PaymentService } from "./payment.service.js";
import type { Request, Response } from "express";
import { envVars } from "../../config/env.js";


const initPayment = catchAsync(async (req: Request, res: Response) => {

    const bookingId = req.params.bookingId;

    const result = await PaymentService.initPayment(bookingId as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Payment initiated successfully",
        data: result
    })
});

const successPayment = catchAsync(async (req: Request, res: Response) => {

    const query = req.query;
    
    const result = await PaymentService.successPayment(query) as { success: boolean; message: string; transactionId: string };

    if (result.success) {
        res.redirect(`${envVars.SSL_SUCCESS_FRONTEND_URL}?transactionId=${result.transactionId}`);
    } else {
        res.redirect(`${envVars.SSL_FAIL_FRONTEND_URL}?transactionId=${result.transactionId}`);
    }
});

const failPayment = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    
    const result = await PaymentService.failPayment(query)as { success: boolean; message: string; transactionId: string };

    res.redirect(`${envVars.SSL_FAIL_FRONTEND_URL}?transactionId=${result.transactionId}`);
});

const cancelPayment = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    
    const result = await PaymentService.cancelPayment(query) as { success: boolean; message: string; transactionId: string };

    res.redirect(`${envVars.SSL_CANCEL_FRONTEND_URL}?transactionId=${result.transactionId}`);
});

export const PaymentController = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment
}
