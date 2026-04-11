
import { AuthService } from "./auth.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import  type {Request , Response ,NextFunction} from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookie.js";
import type { JwtPayload } from "jsonwebtoken";
import { th } from "zod/locales";
import AppError from "../../errorHelper/AppError.js";
import { createTokens } from "../../utils/userTokens.js";
import { envVars } from "../../config/env.js";
import passport from "passport";





const credentialsLogin = catchAsync(async (req: Request, res: Response, next:NextFunction) => {
   

    passport.authenticate("local",async (err:any, user:any, info:any) => {
        if (err) {
            return next(new AppError(401, err));
        }
        if (!user) {
            return next(new AppError(401, info.message || "Authentication failed"));
        }

        const userToken = await createTokens(user);

        const {password: pass, ...rest}= user.toObject();
        
    

    setAuthCookie(res, userToken);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Login successful",
        data: {
            accessToken: userToken.accessToken,
            refreshToken: userToken.refreshToken,   
            user: rest
        }
    });
    })(req, res, next);
});

const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
   

    const refreshtoken = req.cookies.refreshToken;

    if (!refreshtoken) {
        return sendResponse(res, {
            statusCode: StatusCodes.UNAUTHORIZED,
            success: false,
            message: "Refresh token not found",
        });
    }

    const tokenInfo = await AuthService.getNewAccessToken(refreshtoken as string);

    // Here you would typically verify the refresh token and generate a new access token
    // For demonstration, let's assume the refresh token is valid and we generate a new access token
    setAuthCookie(res, tokenInfo);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "refreshtoken is valid, new access token generated successfully ",
        data: tokenInfo
    });
});


const logout= catchAsync(async (req: Request, res: Response) => {
   
    // Clear the authentication cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Loout successful",
        data: null
    });
});

const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const decodedToken = req.user

    await AuthService.resetPassword(req.body, decodedToken as JwtPayload);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Password Changed Successfully",
        data: null,
    })
})
const forgetPassword = catchAsync(async (req: Request, res: Response) => {


    const decodedToken = req.user

    await AuthService.resetPassword(req.body, decodedToken as JwtPayload);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Password Changed Successfully",
        data: null,
    })
});
const setPassword = catchAsync(async (req: Request, res: Response) => {

    const decodedToken = req.user as JwtPayload

    const {password } = req.body

    await AuthService.resetPassword("", decodedToken.userId,password, );

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Password Changed Successfully",
        data: null,
    })
});

const googleCallbackController = catchAsync(async (req: Request, res: Response) => {
    let redirectTo = req.query.state ? req.query.state as string : ""

        if (redirectTo.startsWith("/")){
            redirectTo = redirectTo.slice(1)
        }


    const user = req.user;
    if (!user) {
        throw new AppError(StatusCodes.UNAUTHORIZED, "Google authentication failed");
    }

    const tokenInfo = createTokens(user);
    
    setAuthCookie(res, tokenInfo);

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`); // Redirect to frontend after successful login

})

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
    const token = typeof req.body.token === "string" ? req.body.token : "";
    if (!token) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Verification token is required");
    }

    const result = await AuthService.verifyEmail(token);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: result.alreadyVerified ? "User is already verified" : "Email verified successfully",
        data: result
    });
});

const resendVerification = catchAsync(async (req: Request, res: Response) => {
    const email = typeof req.body.email === "string" ? req.body.email : "";
    if (!email) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Email is required");
    }

    const result = await AuthService.resendVerification(email);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: result.alreadyVerified ? "User is already verified" : "Verification token generated",
        data: result
    });
});


export const AuthController = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallbackController,
    forgetPassword,
    setPassword,
    verifyEmail,
    resendVerification
}   
