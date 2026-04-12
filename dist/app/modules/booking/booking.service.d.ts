import { type IBooking } from "./booking.interface.js";
export declare const BookingService: {
    createBooking: (payload: Partial<IBooking>, userId: string) => Promise<{
        booking: (import("mongoose").Document<unknown, {}, IBooking, {}, import("mongoose").DefaultSchemaOptions> & IBooking & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }) | null;
        paymentURL: any;
    }>;
    getAllBookings: () => Promise<{}>;
    updateBookingStatus: () => Promise<{}>;
    getBookingById: () => Promise<{}>;
    getUserBookings: () => Promise<{}>;
};
//# sourceMappingURL=booking.service.d.ts.map