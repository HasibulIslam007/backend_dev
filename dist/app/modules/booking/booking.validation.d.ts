import { z } from "zod";
import { BOOKING_STATUS } from "./booking.interface.js";
export declare const createBookingZodSchema: z.ZodObject<{
    tour: z.ZodString;
    guestCount: z.ZodNumber;
}, z.core.$strip>;
export declare const updateBookingZodSchema: z.ZodObject<{
    status: z.ZodEnum<{
        PENDING: BOOKING_STATUS.PENDING;
        CANCEL: BOOKING_STATUS.CANCEL;
        CONFIRM: BOOKING_STATUS.CONFIRM;
        COMPLETED: BOOKING_STATUS.COMPLETED;
        FAILED: BOOKING_STATUS.FAILED;
    }>;
}, z.core.$strip>;
//# sourceMappingURL=booking.validation.d.ts.map