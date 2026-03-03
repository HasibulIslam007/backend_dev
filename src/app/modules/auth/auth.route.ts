import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { validateRequest } from "../../middlewares/validateRequest.js";


const router =Router()

router.post("/login",  AuthController.credentialsLogin);

export const AuthRoute = router