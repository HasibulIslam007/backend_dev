
import { Schema, model } from "mongoose";
import type { IBooking } from "./booking.interface.js";
import { BOOKING_STATUS } from "./booking.interface.js";

const bookingSchema = new Schema<IBooking>({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tour:{
        type: Schema.Types.ObjectId,
        ref: "Tour",
        required: true  

    },
    payment:{
        type: Schema.Types.ObjectId,
        ref: "Payment",
    },
    guestCount:{
        type: Number,
        required: true,
        min: 1
    },
    status:{
        type: String,
        enum: Object.values(BOOKING_STATUS),
        default: BOOKING_STATUS.PENDING
    }
},
{
    timestamps : true,  

})

export const Booking = model<IBooking>("Booking", bookingSchema);