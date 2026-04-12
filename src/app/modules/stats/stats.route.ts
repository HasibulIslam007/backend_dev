import express from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { UserRole } from "../user/user.interface.js";
import { StatsController } from "./stats.controller.js";

const router = express.Router();

router.get(
    "/booking",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    StatsController.getBookingStats
);
router.get(
    "/payment",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    StatsController.getPaymentStats
);
router.get(
    "/user",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    StatsController.getUserStats
);
router.get(
    "/tour",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    StatsController.getTourStats
);

export const StatsRoutes = router;