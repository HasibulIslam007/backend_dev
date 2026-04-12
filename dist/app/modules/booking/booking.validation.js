import { z } from "zod";
import { BOOKING_STATUS } from "./booking.interface.js";
export const createBookingZodSchema = z.object({
    tour: z.string(),
    guestCount: z.number().min(1, "Guest count must be at least 1")
});
export const updateBookingZodSchema = z.object({
    status: z.enum(Object.values(BOOKING_STATUS))
});
//# sourceMappingURL=booking.validation.js.map