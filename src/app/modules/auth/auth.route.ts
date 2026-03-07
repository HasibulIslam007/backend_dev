import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";

import { UserRole } from "../user/user.interface.js";


const router =Router()

router.post("/login",  AuthController.credentialsLogin);
router.post("/refresh-token", AuthController.getNewAccessToken);
router.post("/logout", AuthController.logout);
router.post("/reset-password", checkAuth(...Object.values(UserRole)),AuthController.resetPassword);                        

export const AuthRoute = router