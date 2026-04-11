import { Router } from "express";

import { UserRoute } from "../modules/user/user.route.js";
import { AuthRoute } from "../modules/auth/auth.route.js";

import { DivisionRoute } from "../modules/division/division.route.js";
import { TourRoute } from "../modules/tour/tour.route.js";
import { BookingRoutes } from "../modules/booking/booking.route.js";

import { PaymentRoute } from "../modules/payment/payment.route.js";


export const router = Router();

const modulesRoutes = [
    {
        path: "/users",
        route :  UserRoute
    },
    {
        path: "/auth",
        route: AuthRoute
    },
    {
        path: "/divisions",
        route: DivisionRoute
    },
    {
        path: "/tours",
        route: TourRoute
    },
    {
        path: "/bookings",
        route: BookingRoutes
    },
    {
        path: "/payments",
        route: PaymentRoute
    },
    
]

modulesRoutes.forEach((route)=>{
    router.use(route.path, route.route);
})

export const IndexRoute = router;