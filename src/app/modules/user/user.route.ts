import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { UserController } from "./user.controller.js";
import { UserRole } from "./user.interface.js";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";

const router = Router()



router.post("/register", validateRequest(createUserZodSchema), UserController.createUser)
router.get("/all-users", checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), UserController.getAllUsers)
export const UserRoute = router;