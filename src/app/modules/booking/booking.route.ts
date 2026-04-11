
import express from 'express';
import { checkAuth } from '../../middlewares/checkAuth.js';
import { UserRole } from '../user/user.interface.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { createBookingZodSchema, updateBookingZodSchema } from './booking.validation.js';
import { BookingController } from './booking.controller.js';


const router = express.Router();


router.post('/',
    checkAuth(...Object.values(UserRole)),
    validateRequest(createBookingZodSchema),
    BookingController.createBooking     


);

router.get('/', checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), BookingController.getAllBookings);


router.get('/my-bookings', checkAuth(...Object.values(UserRole)), BookingController.getUserBookings);


router.patch('/:bookingId/status', checkAuth(...Object.values(UserRole)), 
validateRequest(updateBookingZodSchema),

BookingController.updateBookingStatus);


export const BookingRoutes =router;