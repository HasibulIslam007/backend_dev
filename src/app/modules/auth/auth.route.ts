import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { resendVerificationZodSchema, verifyEmailZodSchema } from "./auth.validation.js";

import { UserRole } from "../user/user.interface.js";
import passport from "passport";

import type { Request, Response, NextFunction } from "express";

const router =Router()

router.post("/login",  AuthController.credentialsLogin);
router.post("/refresh-token", AuthController.getNewAccessToken);
router.post("/logout", AuthController.logout);
router.post("/reset-password", checkAuth(...Object.values(UserRole)),AuthController.resetPassword);   
router.post("/forget-password" ,AuthController.forgetPassword); 
router.post("/set-password", checkAuth(...Object.values(UserRole)),AuthController.setPassword);     
router.post("/verify-email", validateRequest(verifyEmailZodSchema), AuthController.verifyEmail);
router.post("/resend-verification", validateRequest(resendVerificationZodSchema), AuthController.resendVerification);

router.get("/google", async(req:Request, res:Response , next:NextFunction)=>{
    const redirect = req.query.redirect ? req.query.redirect as string : ""
    passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res, next);

})

router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/login" }), AuthController.googleCallbackController) 
export const AuthRoute = router
