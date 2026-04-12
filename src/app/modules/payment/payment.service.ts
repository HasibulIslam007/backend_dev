/* eslint-disable @typescript-eslint/no-explicit-any */

import { Payment } from "./payment.model.js";
import { Booking } from "../booking/booking.model.js";
import type { ISSLComerz } from "../sslCommerz/sslCommerz.interface.js";
import { SSLService } from "../sslCommerz/sslCommerz.service.js";

import { PAYMENT_STATUS } from "./payment.interface.js";
import { BOOKING_STATUS } from "../booking/booking.interface.js";
import AppError from "../../errorHelper/AppError.js";
import  { generatePdf} from "../../utils/invoice.js";
import  type {IInvoiceData} from "../../utils/invoice.js";
import { uploadBufferToCloudinary } from "../../config/cloudinary.config.js";
import { sendEmail } from "../../utils/sendEmail.js";

interface ITour {
    title: string;
}

interface IUser {
    name: string;
    email: string;
}

const initPayment = async (bookingId: string) => {

    const payment = await Payment.findOne({booking: bookingId})
    if (!payment) {
        throw new AppError(404, "Payment not found for this booking")
    }

    const booking = await Booking.findById(payment.booking).populate({
        path: "user",
        select: "name phone address +email"
    })
    if (!booking) {
        throw new Error("Booking not found for this payment")
    }

    const user = booking.user as any;
    const userAddress = user?.address || "";
    const userEmail = user?.email || "";
    const userName = user?.name || "";
    const userPhone = user?.phone || "";

    const sslPayload: ISSLComerz = {

        address: userAddress,
        email: userEmail,
        name: userName,
        phoneNumber: userPhone,
        amount: payment.amount,
        transactionId: payment.transactionId,
    }

    const sslPayment = await SSLService.sslPaymentInit(sslPayload);

    return{
        paymentUrl : sslPayment.GatewayPageURL
    }

}

const successPayment = async (transactionId: string, gatewayData?: unknown) => {

    // Update Booking Status to COnfirm 
    // Update Payment Status to PAID

    const session = await Booking.startSession();
    session.startTransaction()

    try {


        const updatedPayment = await Payment.findOneAndUpdate(
            { transactionId },
            {
                status: PAYMENT_STATUS.PAID,
                paymentGatewayData: gatewayData
            },
            { new: true, runValidators: true, session }
        )

        if (!updatedPayment) {
            throw new AppError(401, "Payment not found")
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            updatedPayment.booking,
            { status: BOOKING_STATUS.CONFIRM },
            { new: true, runValidators: true, session }
        )
            .populate("tour", "title")
            .populate({
                path: "user",
                select: "name +email"
            })

        if (!updatedBooking) {
            throw new AppError(401, "Booking not found")
        }

        await session.commitTransaction(); //transaction
        session.endSession()

        const bookingCreatedAtRaw = updatedBooking.get("createdAt");
        const bookingCreatedAt =
            bookingCreatedAtRaw instanceof Date
                ? bookingCreatedAtRaw
                : new Date(bookingCreatedAtRaw ?? Date.now());

        const invoiceData: IInvoiceData = {
            bookingDate: bookingCreatedAt,
            guestCount: updatedBooking.guestCount,
            totalAmount: updatedPayment?.amount || 0,
            tourTitle: (updatedBooking.tour as unknown as ITour).title,
            transactionId: updatedPayment?.transactionId || "",
            userName: (updatedBooking.user as unknown as IUser).name
        }

        // Post-commit: generate invoice + send email (do not rollback payment if this fails)
        try {
            const pdfBuffer = await generatePdf(invoiceData)
            const cloudinaryResult = await uploadBufferToCloudinary(pdfBuffer, "invoice")

            if (cloudinaryResult?.secure_url) {
                await Payment.findByIdAndUpdate(
                    updatedPayment._id,
                    { invoiceUrl: cloudinaryResult.secure_url },
                    { runValidators: true }
                )
            }

            await sendEmail({
                to: (updatedBooking.user as unknown as IUser).email,
                subject: "Your Booking Invoice",
                templateName: "invoice",
                templateData: invoiceData,
                attachments: [
                    {
                        filename: "invoice.pdf",
                        content: pdfBuffer,
                        contentType: "application/pdf"
                    }
                ]
            })
        } catch (error) {
            console.log("Post-payment invoice/email failed", error);
        }

        return { success: true, message: "Payment Completed Successfully", transactionId: updatedPayment.transactionId || "" }
    } catch (error) {
        await session.abortTransaction(); // rollback
        session.endSession()
        // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
        throw error
    }
};


const failPayment = async (transactionId: string, gatewayData?: unknown) => {

    const session = await Booking.startSession();
    session.startTransaction();

    try {
        const updatePayment = await Payment.findOneAndUpdate(
            { transactionId },
            { status: PAYMENT_STATUS.FAILED, paymentGatewayData: gatewayData },
            { new: true, session }
        )
        if (!updatePayment) {
            throw new AppError(401, "Payment not found")
        }

        await Booking.findByIdAndUpdate(
            updatePayment?.booking,
            {status: BOOKING_STATUS.FAILED},
            {returnDocument: "after", session}
        )
        
        await session.commitTransaction();
        session.endSession();   
        return {
            success: true,
            message : "Payment failed",
            transactionId: updatePayment.transactionId
        }
        
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        throw error;

    }
};

const cancelPayment = async (transactionId: string, gatewayData?: unknown) => {

    const session = await Booking.startSession();
    session.startTransaction();

    try {
        const updatePayment = await Payment.findOneAndUpdate(
            { transactionId },
            { status: PAYMENT_STATUS.CANCELLED, paymentGatewayData: gatewayData },
            { new: true, session }
        )
        if (!updatePayment) {
            throw new AppError(401, "Payment not found")
        }

        await Booking.findByIdAndUpdate(
            updatePayment?.booking,
            {status: BOOKING_STATUS.CANCEL},
            {returnDocument: "after", session}
        )
        
        await session.commitTransaction();
        session.endSession();   
        return {
            success: true,
            message : "Payment cancelled",
            transactionId: updatePayment.transactionId
        }
        
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        throw error;

    }
};

const validatePayment = async (payload: unknown) => {
    await SSLService.validatePayment(payload);
    return { success: true };
};

export const PaymentService = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment,
    validatePayment
}
