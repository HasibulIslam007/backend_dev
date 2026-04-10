/* eslint-disable @typescript-eslint/no-explicit-any */

import { Payment } from "./payment.model.js";
import { Booking } from "../booking/booking.model.js";

import type { ISSLComerz } from "../sslCommerz/sslCommerz.interface.js";
import { SSLService } from "../sslCommerz/sslCommerz.service.js";

import { PAYMENT_STATUS } from "./payment.interface.js";

const initPayment = async (bookingId: string) => {

    const payment = await Payment.findOne({booking: bookingId})
    if (!payment) {
        throw new Error("Payment not found for this booking")
    }

    const booking = await Booking.findById(payment.booking).populate("user")
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

const successPayment = async (query: any) => {

    const session = await Booking.startSession();

    try {
        const updatePayment = await Payment.findOneAndUpdate(
            {transactionId: query.transactionId},
            {status: PAYMENT_STATUS.PAID},
            {new: true, session}
        )

        await Booking.findByIdAndUpdate(
            updatePayment?.booking,
            {paymentStatus: PAYMENT_STATUS.PAID},
            {new: true, session}
        )
        
        await session.commitTransaction();
        session.endSession();   
        return {
            success: true,
            message : "Payment successful",
        }
        
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        throw error;

    }
};


const failPayment = async (query: any) => {

    const session = await Booking.startSession();

    try {
        const updatePayment = await Payment.findOneAndUpdate(
            {transactionId: query.transactionId},
            {status: PAYMENT_STATUS.FAILED},
            {new: true, session}
        )

        await Booking.findByIdAndUpdate(
            updatePayment?.booking,
            {paymentStatus: PAYMENT_STATUS.FAILED},
            {new: true, session}
        )
        
        await session.commitTransaction();
        session.endSession();   
        return {
            success: true,
            message : "Payment failed",
        }
        
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        throw error;

    }
};

const cancelPayment = async (query: any) => {

    const session = await Booking.startSession();

    try {
        const updatePayment = await Payment.findOneAndUpdate(
            {transactionId: query.transactionId},
            {status: PAYMENT_STATUS.CANCELLED},
            {new: true, session}
        )

        await Booking.findByIdAndUpdate(
            updatePayment?.booking,
            {paymentStatus: PAYMENT_STATUS.CANCELLED},
            {new: true, session}
        )
        
        await session.commitTransaction();
        session.endSession();   
        return {
            success: true,
            message : "Payment cancelled",
        }
        
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        throw error;

    }
};

export const PaymentService = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment
}
