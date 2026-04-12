import { sendResponse } from "../../utils/sendResponse.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { BookingService } from "./booking.service.js";
const createBooking = catchAsync(async (req, res) => {
    const decodeToken = req.user;
    const booking = await BookingService.createBooking(req.body, decodeToken.userId);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Booking created successfully",
        data: booking
    });
});
const getUserBookings = catchAsync(async (req, res) => {
    const booking = await BookingService.getUserBookings();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User bookings retrieved successfully",
        data: booking
    });
});
const getSingleBooking = catchAsync(async (req, res) => {
    const booking = await BookingService.getBookingById();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking retrieved successfully",
        data: booking
    });
});
const getAllBookings = catchAsync(async (req, res) => {
    const bookings = await BookingService.getAllBookings();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All bookings retrieved successfully",
        data: bookings
    });
});
const updateBookingStatus = catchAsync(async (req, res) => {
    const updated = await BookingService.updateBookingStatus();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Booking status updated successfully",
        data: updated
    });
});
export const BookingController = {
    createBooking,
    getUserBookings,
    getSingleBooking,
    getAllBookings,
    updateBookingStatus
};
//# sourceMappingURL=booking.controller.js.map