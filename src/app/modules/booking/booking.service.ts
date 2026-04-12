/* eslint-disable @typescript-eslint/no-explicit-any */
import { BOOKING_STATUS, type IBooking } from "./booking.interface.js";
import { Booking } from "./booking.model.js";
import { User } from "../user/user.model.js";
import { Tour } from "../tour/tour.model.js";
import { PAYMENT_STATUS } from "../payment/payment.interface.js";
import { Payment } from "../payment/payment.model.js";
import type { ISSLComerz } from "../sslCommerz/sslCommerz.interface.js";
import { SSLService } from "../sslCommerz/sslCommerz.service.js";
import { getTransactionId } from "../../utils/getTransactionId.js";





const createBooking = async( payload: Partial<IBooking>, userId: string)=> {

    const transactionId = getTransactionId();

    const session = await Booking.startSession();

    session.startTransaction();

    try {

        const user = await User.findById(userId);


         
         const tour = await Tour.findById(payload.tour).select("costFrom");
            if(!tour?.costFrom){
                throw new Error("Tour not found or cost information is missing");
            }

            const amount = Number(tour.costFrom) * Number(payload.guestCount)

            const booking = new Booking({
                user : userId,
                status: BOOKING_STATUS.PENDING,
                ...payload
            })
            await booking.save({ session })

            const payment = new Payment({
                booking : booking._id,
                status : PAYMENT_STATUS.UNPAID,
                transactionId: transactionId,
                amount : amount,
            })
            await payment.save({ session })

            const updateBooking = await Booking.findByIdAndUpdate(
                booking._id,
                {payment: payment._id},
                {new: true, runValidators: true, session}
            )
            .populate("user", "name email phone address")
            .populate("tour", " title costFrom")
            .populate("payment")
            
            const userAddress =(updateBooking?.user as any)?.address || "";
            const userEmail =(updateBooking?.user as any)?.email || "";
            const userName =(updateBooking?.user as any)?.name || "";
            const userPhone =(updateBooking?.user as any)?.phone || "";

            const sslPayload: ISSLComerz = {

                address: userAddress,
                email: userEmail,
                name: userName,
                phoneNumber: userPhone,
                amount: amount,
                transactionId: transactionId    
            }

            const sslPayment = await SSLService.sslPaymentInit(sslPayload);


            await session.commitTransaction();
            session.endSession();

            return {
                booking: updateBooking,
                paymentURL : sslPayment.GatewayPageURL
            };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}

const getBookingById = async () =>{
    return {}
}

const getUserBookings = async () =>{
    return {}
}

const updateBookingStatus = async () =>{
    return {}
}

const getAllBookings = async () =>{
    return {}
}

export const BookingService = {
    createBooking,
    getAllBookings,
    updateBookingStatus,
    getBookingById,
    getUserBookings

    
}