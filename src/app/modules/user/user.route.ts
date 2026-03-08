import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { UserController } from "./user.controller.js";
import { UserRole } from "./user.interface.js";
import { createUserZodSchema} from "./user.validation.js";
import { updateUserZodSchema } from "./user.validation.js";


const router = Router()



router.post("/register", validateRequest(createUserZodSchema), UserController.createUser)
router.get("/all-users", checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN), UserController.getAllUsers)
router.patch("/:id", validateRequest(updateUserZodSchema), checkAuth(...Object.values(UserRole)), UserController.updateUser)
export const UserRoute = router;