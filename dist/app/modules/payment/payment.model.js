import { Schema, model } from "mongoose";
import { PAYMENT_STATUS } from "./payment.interface.js";
const paymentSchema = new Schema({
    booking: {
        type: Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentGatewayData: {
        type: Schema.Types.Mixed,
    },
    invoiceUrl: {
        type: String,
    },
    status: {
        type: String,
        enum: Object.values(PAYMENT_STATUS),
        default: PAYMENT_STATUS.UNPAID
    }
}, {
    timestamps: true,
});
export const Payment = model("Payment", paymentSchema);
//# sourceMappingURL=payment.model.js.map