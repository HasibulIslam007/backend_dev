import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import httpStatus from "http-status-codes";
import { PaymentService } from "./payment.service.js";
import { envVars } from "../../config/env.js";
import AppError from "../../errorHelper/AppError.js";
const initPayment = catchAsync(async (req, res) => {
    const bookingId = req.params.bookingId;
    const result = await PaymentService.initPayment(bookingId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Payment initiated successfully",
        data: result
    });
});
const successPayment = catchAsync(async (req, res) => {
    const transactionId = req.query.transactionId ||
        req.query.tran_id ||
        req.body?.transactionId ||
        req.body?.tran_id;
    if (!transactionId) {
        throw new AppError(httpStatus.BAD_REQUEST, "transactionId is required");
    }
    if (envVars.NODE_ENV !== "production") {
        console.log("SSL success transactionId:", transactionId);
    }
    if (envVars.NODE_ENV !== "production") {
        console.log("SSL success callback payload:", { query: req.query, body: req.body });
    }
    const result = await PaymentService.successPayment(transactionId, { query: req.query, body: req.body });
    if (result.success) {
        res.redirect(`${envVars.SSL_SUCCESS_FRONTEND_URL}?transactionId=${result.transactionId}`);
    }
    else {
        res.redirect(`${envVars.SSL_FAIL_FRONTEND_URL}?transactionId=${result.transactionId}`);
    }
});
const failPayment = catchAsync(async (req, res) => {
    const transactionId = req.query.transactionId ||
        req.query.tran_id ||
        req.body?.transactionId ||
        req.body?.tran_id;
    if (!transactionId) {
        throw new AppError(httpStatus.BAD_REQUEST, "transactionId is required");
    }
    if (envVars.NODE_ENV !== "production") {
        console.log("SSL fail transactionId:", transactionId);
    }
    if (envVars.NODE_ENV !== "production") {
        console.log("SSL fail callback payload:", { query: req.query, body: req.body });
    }
    const result = await PaymentService.failPayment(transactionId, { query: req.query, body: req.body });
    res.redirect(`${envVars.SSL_FAIL_FRONTEND_URL}?transactionId=${result.transactionId}`);
});
const cancelPayment = catchAsync(async (req, res) => {
    const transactionId = req.query.transactionId ||
        req.query.tran_id ||
        req.body?.transactionId ||
        req.body?.tran_id;
    if (!transactionId) {
        throw new AppError(httpStatus.BAD_REQUEST, "transactionId is required");
    }
    if (envVars.NODE_ENV !== "production") {
        console.log("SSL cancel transactionId:", transactionId);
    }
    if (envVars.NODE_ENV !== "production") {
        console.log("SSL cancel callback payload:", { query: req.query, body: req.body });
    }
    const result = await PaymentService.cancelPayment(transactionId, { query: req.query, body: req.body });
    res.redirect(`${envVars.SSL_CANCEL_FRONTEND_URL}?transactionId=${result.transactionId}`);
});
const validatePayment = catchAsync(async (req, res) => {
    const payload = Object.keys(req.body ?? {}).length ? req.body : req.query;
    const result = await PaymentService.validatePayment(payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Payment validated successfully",
        data: result
    });
});
export const PaymentController = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment,
    validatePayment
};
//# sourceMappingURL=payment.controller.js.map