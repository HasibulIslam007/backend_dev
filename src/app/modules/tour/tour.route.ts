
import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { UserRole } from "../user/user.interface.js";
import { validateRequest } from "../../middlewares/validateRequest.js";

import { createTourTypeZodSchema, createTourZodSchema, updateTourZodSchema} from "./tour.validation.js";
import { TourController } from "./tour.controller.js";



const router = Router();

router.post("/create",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    validateRequest(createTourZodSchema),
    TourController.createTour,

)

router.get("/",TourController.getAllTours)


router.patch(
    "/:id",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    validateRequest(updateTourZodSchema),
    TourController.UpdateTour
)

router.delete(
    "/:id",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    TourController.deleteTour
)



router.get("/tour-type", TourController.getAllTourTypes);

router.post("/create-tour-type",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    validateRequest(createTourTypeZodSchema),
    TourController.createTourType
)
router.patch(
    "/tour-type/:id",
    checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
    validateRequest(createTourTypeZodSchema),
    TourController.updateTourType
)



export const TourRoute = router;

