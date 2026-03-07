
import { AuthService } from "./auth.service.js";
import { catchAsync } from "../../utils/catchAsync.js";
import  type {Request , Response} from "express";
import { sendResponse } from "../../utils/sendResponse.js";
import { StatusCodes } from "http-status-codes";
import { setAuthCookie } from "../../utils/setCookie.js";


const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
   

    const loginInfo = await AuthService.credentialsLogin(req.body);

    setAuthCookie(res, loginInfo);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Login successful",
        data: loginInfo
    });
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

    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user

    await AuthService.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Password Changed Successfully",
        data: null,
    })
})


export const AuthController = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword
}   